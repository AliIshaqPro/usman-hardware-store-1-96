
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Package } from "lucide-react";

interface OrdersSummaryCardsProps {
  summary: {
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
  };
}

export const OrdersSummaryCards = ({ summary }: OrdersSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{summary.totalOrders}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Sales</p>
              <p className="text-2xl font-bold text-green-600">Rs. {summary.totalSales.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-purple-600">Rs. {summary.avgOrderValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
