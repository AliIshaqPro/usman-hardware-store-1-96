
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { FileText, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { salesApi } from "@/services/api";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { PDFExportModal, ExportOptions } from "@/components/orders/PDFExportModal";
import { OrdersSummaryCards } from "@/components/orders/OrdersSummaryCards";
import { OrdersFilters } from "@/components/orders/OrdersFilters";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { generateOrderPDF } from "@/utils/orderPdfGenerator";
import jsPDF from 'jspdf';

interface Sale {
  id: number;
  orderNumber: string;
  customerId: number | null;
  customerName: string | null;
  date: string;
  time: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdBy: string;
  createdAt: string;
}

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    avgOrderValue: 0
  });
  
  const [selectedOrder, setSelectedOrder] = useState<Sale | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isPDFExportModalOpen, setIsPDFExportModalOpen] = useState(false);

  // Debounced search state
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filterStatus, filterCustomer, filterPaymentMethod, dateFrom, dateTo]);

  // Handle search with debouncing - reset to page 1 when searching
  useEffect(() => {
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }

    const timeout = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchOrders(1); // Fetch with search term
    }, 500);

    setSearchDebounce(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchTerm]);

  const fetchOrders = async (page = currentPage) => {
    try {
      setLoading(true);
      const params: any = {
        page: page,
        limit: 20
      };

      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      if (filterCustomer) {
        params.customerId = parseInt(filterCustomer);
      }

      if (dateFrom) {
        params.dateFrom = dateFrom;
      }

      if (dateTo) {
        params.dateTo = dateTo;
      }

      // Add search term to API parameters
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      // Add payment method filter to API parameters
      if (filterPaymentMethod !== "all") {
        params.paymentMethod = filterPaymentMethod;
      }

      const response = await salesApi.getAll(params);
      
      if (response.success) {
        setOrders(response.data.sales);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage || page);
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order: Sale) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleOrderPDF = async (order: Sale) => {
    try {
      await generateOrderPDF(order);
      toast({
        title: "Receipt Generated!",
        description: `Thermal receipt for order ${order.orderNumber}`,
      });
    } catch (error) {
      console.error('Failed to generate receipt:', error);
      toast({
        title: "Receipt Generation Failed",
        description: "Failed to generate thermal receipt. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders(1);
  };

  const handleAdvancedPDFExport = async (options: ExportOptions) => {
    try {
      setExportLoading(true);
      setIsPDFExportModalOpen(false);
      
      // Build query parameters based on options
      const params: any = { 
        limit: 10000,
        page: 1
      };

      // Add customer filtering
      if (options.customerScope === 'single' && options.selectedCustomers.length === 1) {
        params.customerId = options.selectedCustomers[0];
      } else if (options.customerScope === 'multiple' && options.selectedCustomers.length > 0) {
        params.customerIds = options.selectedCustomers.join(',');
      }

      // Add time filtering
      const now = new Date();
      switch (options.timeScope) {
        case 'today':
          params.dateFrom = now.toISOString().split('T')[0];
          params.dateTo = now.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          params.dateFrom = weekStart.toISOString().split('T')[0];
          params.dateTo = new Date().toISOString().split('T')[0];
          break;
        case 'monthly':
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          params.dateFrom = monthStart.toISOString().split('T')[0];
          params.dateTo = new Date().toISOString().split('T')[0];
          break;
        case 'custom':
          if (options.startDate) params.dateFrom = options.startDate;
          if (options.endDate) params.dateTo = options.endDate;
          break;
      }

      // Fetch filtered orders
      const response = await salesApi.getAll(params);
      
      if (response.success) {
        const filteredOrders = response.data.sales || response.data || [];
        
        // Create PDF
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const margin = 20;
        let yPos = margin;

        // Title
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Orders Export Report', pageWidth / 2, yPos, { align: 'center' });
        yPos += 15;

        // Export info
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Export Date: ${new Date().toLocaleString()}`, margin, yPos);
        yPos += 8;
        
        // Add filter information
        let filterText = '';
        if (options.customerScope === 'single') {
          filterText += 'Single Customer | ';
        } else if (options.customerScope === 'multiple') {
          filterText += `${options.selectedCustomers.length} Customers | `;
        } else {
          filterText += 'All Customers | ';
        }
        
        switch (options.timeScope) {
          case 'today':
            filterText += 'Today';
            break;
          case 'weekly':
            filterText += 'This Week';
            break;
          case 'monthly':
            filterText += 'This Month';
            break;
          case 'custom':
            filterText += `${options.startDate} to ${options.endDate}`;
            break;
          default:
            filterText += 'All Time';
        }
        
        pdf.text(`Filters: ${filterText}`, margin, yPos);
        yPos += 8;
        pdf.text(`Total Orders: ${filteredOrders.length}`, margin, yPos);
        yPos += 8;

        // Calculate total sales
        const totalSales = filteredOrders.reduce((sum: number, order: Sale) => sum + (order.subtotal - order.discount), 0);
        pdf.text(`Total Sales: PKR ${totalSales.toLocaleString()}`, margin, yPos);
        yPos += 15;

        // Table headers
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const headers = ['Order #', 'Customer', 'Date', 'Items', 'Total', 'Status'];
        const colWidths = [25, 35, 25, 15, 30, 20];
        let xPos = margin;

        headers.forEach((header, index) => {
          pdf.text(header, xPos, yPos);
          xPos += colWidths[index];
        });
        yPos += 8;

        // Draw line under headers
        pdf.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
        yPos += 3;

        // Table data
        pdf.setFont('helvetica', 'normal');
        filteredOrders.forEach((order: Sale) => {
          // Check if we need a new page
          if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
          }

          xPos = margin;
          const finalTotal = order.subtotal - order.discount;
          const rowData = [
            order.orderNumber.substring(0, 12),
            (order.customerName || 'Walk-in').substring(0, 18),
            new Date(order.date).toLocaleDateString(),
            order.items.length.toString(),
            finalTotal.toLocaleString(),
            order.status
          ];

          rowData.forEach((data, index) => {
            pdf.text(data, xPos, yPos);
            xPos += colWidths[index];
          });
          yPos += 6;
        });

        // Footer
        yPos = pageHeight - 20;
        pdf.setFontSize(8);
        pdf.text(`Generated by Order Management System`, pageWidth / 2, yPos, { align: 'center' });

        // Save PDF
        const filename = `orders_export_${options.timeScope}_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);

        toast({
          title: "PDF Export Successful",
          description: `Exported ${filteredOrders.length} orders to PDF.`,
        });
      }
    } catch (error) {
      console.error('Failed to export orders to PDF:', error);
      toast({
        title: "PDF Export Failed",
        description: "Failed to export orders data to PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setExportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 space-y-6 min-h-screen bg-slate-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  // Get unique customers for the export modal
  const uniqueCustomers = orders.reduce((acc: Array<{id: number, name: string}>, order) => {
    if (order.customerId && !acc.find(c => c.id === order.customerId)) {
      acc.push({
        id: order.customerId,
        name: order.customerName || `Customer #${order.customerId}`
      });
    }
    return acc;
  }, []);

  return (
    <div className="flex-1 p-2 md:p-6 space-y-3 min-h-[calc(100vh-65px)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-500">Orders Management</h1>
            <p className="text-slate-600">View and manage all customer orders</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsPDFExportModalOpen(true)}
            disabled={exportLoading}
            className="bg-red-600 hover:bg-red-700 text-white border-red-600"
          >
            {exportLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            {exportLoading ? 'Exporting...' : 'PDF Export'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <OrdersSummaryCards summary={summary} />

      {/* Filters */}
      <Card className="border-slate-200">
        <CardContent>
          <OrdersFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPaymentMethod={filterPaymentMethod}
            setFilterPaymentMethod={setFilterPaymentMethod}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            filterCustomer={filterCustomer}
            setFilterCustomer={setFilterCustomer}
            onSearch={handleSearch}
          />

          {/* Orders Table */}
          <OrdersTable
            orders={orders}
            onViewOrder={handleViewOrder}
            onOrderPDF={handleOrderPDF}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailsModal
        open={isOrderDetailsOpen}
        onOpenChange={setIsOrderDetailsOpen}
        order={selectedOrder}
        onOrderUpdated={fetchOrders}
      />

      {/* PDF Export Modal */}
      <PDFExportModal
        open={isPDFExportModalOpen}
        onOpenChange={setIsPDFExportModalOpen}
        onExport={handleAdvancedPDFExport}
        customers={uniqueCustomers}
        isLoading={exportLoading}
      />
    </div>
  );
};

export default Orders;
