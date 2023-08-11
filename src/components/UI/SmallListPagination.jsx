import React from 'react';
import styled from 'styled-components';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    &:nth-child(3) {
      margin: 1.5rem 1rem;
    }
  }
`;

const ArrowButton = styled.button`
  width: 25px;
  height: 25px;
`;

const SmallListPagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <PaginationBox>
      <ArrowButton
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft size="25px" />
      </ArrowButton>
      <ArrowButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size="25px" />
      </ArrowButton>
      <span>
        {currentPage} / {totalPages}
      </span>
      <ArrowButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size="25px" />
      </ArrowButton>
      <ArrowButton
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight size="25px" />
      </ArrowButton>
    </PaginationBox>
  );
};

export default SmallListPagination;
