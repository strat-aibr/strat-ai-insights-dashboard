
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type HeatmapData = {
  [day: string]: {
    [hour: string]: number;
  };
};

type WeeklyHeatmapProps = {
  data: HeatmapData;
};

const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
const hours = Array.from({ length: 24 }, (_, i) => 
  i.toString().padStart(2, '0') + ':00'
);

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
  let maxValue = 0;
  Object.values(data).forEach(dayData => {
    Object.values(dayData).forEach(value => {
      maxValue = Math.max(maxValue, value);
    });
  });

  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Heatmap por Dia da Semana</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[80px_repeat(24,minmax(30px,1fr))]">
              <div className="font-medium">Dia/Hora</div>
              {hours.map((hour, idx) => (
                <div key={idx} className="text-xs text-center font-medium">
                  {hour.split(':')[0]}
                </div>
              ))}
              
              {days.map((day, dayIdx) => (
                <>
                  <div key={`day-${dayIdx}`} className="font-medium">{day}</div>
                  {hours.map((hour, hourIdx) => {
                    const hourKey = hour.split(':')[0];
                    const value = data[dayIdx.toString()]?.[hourKey] || 0;
                    return (
                      <div
                        key={`${dayIdx}-${hourIdx}`}
                        className={`${getColorIntensity(value, maxValue)} h-8 flex items-center justify-center text-xs`}
                        title={`${day} ${hour}: ${value} leads`}
                      >
                        {value > 0 ? value : ''}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
