import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
    totalPages: number;
};

const Pagination: FC<PaginationProps> = ({
    currentPage,
    onChangePage,
    totalPages,
}) => {
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
