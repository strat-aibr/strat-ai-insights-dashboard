
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { User } from '@/lib/supabase';
import { CalendarIcon, Download, Search, Filter, X } from 'lucide-react';

export type FilterState = {
  clientId: string | null;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  fonte: string | null;
  campanha: string | null;
  conjunto: string | null;
  anuncio: string | null;
  search: string;
};

type FilterBarProps = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clients: User[];
  fontes: string[];
  campanhas: string[];
  conjuntos: string[];
  anuncios: string[];
  onExport: () => void;
  isClientView: boolean;
};

type DatePreset = {
  label: string;
  getValue: () => { from: Date; to: Date };
};

export function FilterBar({
  filters,
  setFilters,
  clients,
  fontes,
  campanhas,
  conjuntos,
  anuncios,
  onExport,
  isClientView
}: FilterBarProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      ...filters,
      fonte: null,
      campanha: null,
      conjunto: null,
      anuncio: null,
      search: ''
    });
  };

  const formatDateRange = () => {
    if (!filters.dateRange.from) return 'Select date range';
    
    if (!filters.dateRange.to) {
      return format(filters.dateRange.from, 'PPP');
    }
    
    return `${format(filters.dateRange.from, 'PP')} - ${format(filters.dateRange.to, 'PP')}`;
  };

  const datePresets: DatePreset[] = [
    {
      label: 'Hoje',
      getValue: () => {
        const now = new Date();
        return {
          from: now,
          to: now
        };
      }
    },
    {
      label: 'Ontem',
      getValue: () => {
        const yesterday = subDays(new Date(), 1);
        return {
          from: yesterday,
          to: yesterday
        };
      }
    },
    {
      label: 'Últimos 7 dias',
      getValue: () => {
        return {
          from: subDays(new Date(), 6),
          to: new Date()
        };
      }
    },
    {
      label: 'Últimos 14 dias',
      getValue: () => {
        return {
          from: subDays(new Date(), 13),
          to: new Date()
        };
      }
    },
    {
      label: 'Últimos 30 dias',
      getValue: () => {
        return {
          from: subDays(new Date(), 29),
          to: new Date()
        };
      }
    },
    {
      label: 'Este mês',
      getValue: () => {
        const now = new Date();
        return {
          from: startOfMonth(now),
          to: now
        };
      }
    },
    {
      label: 'Mês passado',
      getValue: () => {
        const now = new Date();
        const lastMonth = subMonths(now, 1);
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        };
      }
    }
  ];

  const selectDatePreset = (preset: DatePreset) => {
    const { from, to } = preset.getValue();
    setFilters({
      ...filters,
      dateRange: { from, to }
    });
    setCalendarOpen(false);
  };

  return (
    <Card className="filter-card mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {!isClientView && (
            <div className="lg:col-span-2">
              <Select
                value={filters.clientId || 'all'}
                onValueChange={(value) => setFilters({ ...filters, clientId: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clientes</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="lg:col-span-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto flex" align="start">
                <div className="border-r p-2 flex flex-col space-y-1 min-w-[160px]">
                  {datePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="ghost"
                      className="justify-start text-left font-normal"
                      onClick={() => selectDatePreset(preset)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange.from}
                  selected={{
                    from: filters.dateRange.from,
                    to: filters.dateRange.to,
                  }}
                  onSelect={(range) => {
                    setFilters({
                      ...filters,
                      dateRange: {
                        from: range?.from,
                        to: range?.to,
                      },
                    });
                    if (range?.to) {
                      setCalendarOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="lg:col-span-1">
            <Select
              value={filters.fonte || 'all'}
              onValueChange={(value) => setFilters({ ...filters, fonte: value === 'all' ? null : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as fontes</SelectItem>
                {fontes.map((fonte) => (
                  <SelectItem key={fonte} value={fonte}>
                    {fonte}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-1">
            <Select
              value={filters.campanha || 'all'}
              onValueChange={(value) => setFilters({ ...filters, campanha: value === 'all' ? null : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Campanha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as campanhas</SelectItem>
                {campanhas.map((campanha) => (
                  <SelectItem key={campanha} value={campanha}>
                    {campanha}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-1">
            <Select
              value={filters.conjunto || 'all'}
              onValueChange={(value) => setFilters({ ...filters, conjunto: value === 'all' ? null : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Conjunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os conjuntos</SelectItem>
                {conjuntos.map((conjunto) => (
                  <SelectItem key={conjunto} value={conjunto}>
                    {conjunto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-1">
            <Select
              value={filters.anuncio || 'all'}
              onValueChange={(value) => setFilters({ ...filters, anuncio: value === 'all' ? null : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Anúncio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os anúncios</SelectItem>
                {anuncios.map((anuncio) => (
                  <SelectItem key={anuncio} value={anuncio}>
                    {anuncio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou telefone"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-8"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({ ...filters, search: '' })}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 flex space-x-2">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              <Filter className="mr-2 h-4 w-4" /> Limpar
            </Button>
            <Button variant="outline" onClick={onExport} className="flex-1">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
