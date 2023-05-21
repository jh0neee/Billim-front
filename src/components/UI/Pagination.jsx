import React from "react";
import Pagination from "react-js-pagination";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import "../../styles/pagination.css";

export const Paginate = ({
  activePage,
  totalItemsCount,
  itemsCountPerPage,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={<MdKeyboardArrowLeft size='22px' />}
      nextPageText={<MdKeyboardArrowRight size='22px' />}
      firstPageText={<MdKeyboardDoubleArrowLeft size='22px' />}
      lastPageText={<MdKeyboardDoubleArrowRight size='22px' />}
      onChange={onChange}
    />
  );
};
