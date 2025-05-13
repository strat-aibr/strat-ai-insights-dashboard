
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Card as LeadCard } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type LeadsTableProps = {
  leads: LeadCard[];
  totalLeads: number;
};

export function LeadsTable({ leads, totalLeads }: LeadsTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(totalLeads / pageSize);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'dd/MM/yyyy HH:mm');
    } catch (e) {
      return dateStr;
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Card className="table-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Lista de Leads</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead>Conjunto</TableHead>
                <TableHead>Anúncio</TableHead>
                <TableHead>Palavra-chave</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{formatDate(lead.data_criacao)}</TableCell>
                    <TableCell>{lead.nome}</TableCell>
                    <TableCell>{lead.numero_de_telefone}</TableCell>
                    <TableCell>{lead.fonte || '-'}</TableCell>
                    <TableCell>{lead.campanha || '-'}</TableCell>
                    <TableCell>{lead.conjunto || '-'}</TableCell>
                    <TableCell>{lead.anuncio || '-'}</TableCell>
                    <TableCell>{lead.palavra_chave || '-'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Nenhum lead encontrado com os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={goToPreviousPage} 
                  className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                  aria-disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm">
                  Página {page} de {totalPages > 0 ? totalPages : 1}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={goToNextPage} 
                  className={page === totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                  aria-disabled={page === totalPages || totalPages === 0}
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
