
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';
import { MetricData } from '@/lib/supabase';

type MetricsCardsProps = {
  metrics: MetricData;
};

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const formatChange = (value: number) => {
    if (value > 0) {
      return (
        <div className="flex items-center positive-change">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>+{value.toFixed(1)}%</span>
        </div>
      );
    } else if (value < 0) {
      return (
        <div className="flex items-center negative-change">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span>{value.toFixed(1)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center neutral-change">
          <ChevronRight className="h-4 w-4 mr-1" />
          <span>0%</span>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="stat-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Leads Totais</CardTitle>
          {formatChange(metrics.percentChange)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalLeads}</div>
          <p className="text-xs text-muted-foreground">
            todos os leads independente da fonte
          </p>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Leads Traqueados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.trackedLeads}</div>
          <p className="text-xs text-muted-foreground">
            leads com fonte, exceto Orgânico
          </p>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Leads Orgânicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.organicLeads}</div>
          <p className="text-xs text-muted-foreground">
            apenas leads com fonte Orgânico
          </p>
        </CardContent>
      </Card>

      <Card className="stat-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Média por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageLeadsPerDay.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            total de leads / dias no período
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
