import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
const PagnationTool = () => {
  return (
    <>
      <div className="pagnation">
        <Pagination aria-label="Page navigation" className="pagination-primary">
          <PaginationItem>
            <PaginationLink href="#javascript">Previous</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#javascript">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#javascript">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#javascript">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#javascript">Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
};

export default PagnationTool;
