
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type HeatmapData = {
  [day: string]: number;
};

type WeeklyHeatmapProps = {
  data: HeatmapData;
};

const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

export function WeeklyHeatmap({ data }: WeeklyHeatmapProps) {
  const getColorIntensity = (value: number, max: number) => {
    if (value === 0) return 'bg-gray-100';
    const intensity = Math.min(Math.floor((value / max) * 100), 100);
    
    // Generate a background color based on intensity
    if (intensity < 20) return 'bg-blue-100';
    if (intensity < 40) return 'bg-blue-200';
    if (intensity < 60) return 'bg-blue-300';
    if (intensity < 80) return 'bg-blue-400';
    return 'bg-blue-500';
  };
  
  // Find the maximum value for correct scaling
  const maxValue = Math.max(...Object.values(data), 1);

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Leads por Dia da Semana</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const value = data[index.toString()] || 0;
            return (
              <div key={day} className="flex flex-col items-center">
                <div className={`${getColorIntensity(value, maxValue)} w-full h-24 flex items-center justify-center rounded-md`}>
                  <span className="text-xl font-bold">{value}</span>
                </div>
                <div className="mt-2 font-medium">{day}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
