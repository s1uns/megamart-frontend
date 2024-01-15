import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, totalPages }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected)}
            pageRangeDisplayed={15}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
