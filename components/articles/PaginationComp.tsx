import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// type RolePagination = string;

interface CustomPaginationProps {
  currentPage: number;
  limit: number;
  setPage: (value: number) => void;
  role: RolePagination;
  totalItem: number; // total item render
}

const PaginationComp = ({ currentPage, limit, setPage, role, totalItem }: CustomPaginationProps) => {
  // tampilkan pagination jika total "role user > 9" dan "role admin > 10"
  // console.log('limit', limit);

  const renderPagination = (role === 'Admin' && totalItem > 10) || (role === 'User' && totalItem > 9);

  const totalPages = Math.ceil(totalItem / limit); // total semua pages

  if (!renderPagination || totalPages < 2) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => currentPage > 1 && setPage(currentPage - 1)} />
        </PaginationItem>

        {/* jika lebih dari 1 baru keluarkan .... ini */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive={!!currentPage}>{currentPage}</PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* munculkan jika belum sampai diujung page .... */}
        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext onClick={() => currentPage < totalPages && setPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
