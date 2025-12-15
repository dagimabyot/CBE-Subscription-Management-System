// components/dashboard/DataTables/DataTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  viewAllLink: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  viewAllLink,
  isLoading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="outline" asChild>
          <Link to={viewAllLink}>
            View All
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}