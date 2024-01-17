import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, onChangePage, totalPages }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected)}
            pageRangeDisplayed={15}
            pageCount={totalPages}
            forcePage={currentPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
