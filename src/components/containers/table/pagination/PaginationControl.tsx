import { memo } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export type PaginationControlPropType = {
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  current: number;
  last: number | null;
};

export default memo(function PaginationControl({
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  current,
  last,
}: PaginationControlPropType) {
  return (
    <Pagination className="w-fit m-0">
      <PaginationContent>
        <PaginationItem
          onClick={() => {
            if (hasPrevious) onPrevious();
          }}
        >
          <PaginationPrevious aria-disabled={hasPrevious} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{last && !isNaN(last) ? `${current} of ${last}` : current}</PaginationLink>
        </PaginationItem>
        <PaginationItem
          onClick={() => {
            if (hasNext) onNext();
          }}
        >
          <PaginationNext aria-disabled={!hasNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});
