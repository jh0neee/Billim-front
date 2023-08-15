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
      margin: 0 1rem;
      font-size: 0.8rem;

      > span {
        font-weight: 600;
      }
    }
  }
`;

const ArrowButton = styled.button`
  width: 20px;
  height: 20px;
`;

const SmallListPagination = ({ currentPage, totalPages, handlePageChange }) => {
  return totalPages <= 1 ? null : (
    <PaginationBox>
      <ArrowButton
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft size="20px" />
      </ArrowButton>
      <ArrowButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size="20px" />
      </ArrowButton>
      <p>
        <span>{currentPage}</span> / {totalPages}
      </p>
      <ArrowButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size="20px" />
      </ArrowButton>
      <ArrowButton
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight size="20px" />
      </ArrowButton>
    </PaginationBox>
  );
};

export default SmallListPagination;
