import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import GoodBlock from "../components/GoodBlock";
import { useState, useEffect } from "react";
import Skeleton from "../components/GoodBlock/Skeleton";
import ReactPaginate from "react-paginate";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState("");
    const [sortType, setSortType] = useState({
        name: "popularity",
        sortProperty: "rating",
    });
    const [sortOrder, setSortOrder] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { searchValue } = useContext(SearchContext);


    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://localhost:7295/api/goods/list?page=${currentPage}&limit=5&category=${categoryId}&sortBy=${sortType.sortProperty}&order=${sortOrder}&search=${searchValue}`
        )
            .then((response) => response.json())
            .then((data) => {
                if(data.length < 0){
                    setCurrentPage(0);
                }

                setItems(data.data);
                setTotalPages(data.totalPages);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [
        categoryId,
        sortType.sortProperty,
        sortOrder,
        searchValue,
        currentPage,
    ]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />
                <Sort
                    value={sortType}
                    onChangeSortType={(id) => setSortType(id)}
                    sortOrder={sortOrder}
                    onChangeSortOrder={(order) =>
                        setSortOrder((sortOrder) => order)
                    }
                />
            </div>
            <h2 className="content__title">All goods</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(12)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((item) => (
                          <GoodBlock
                              key={item.id}
                              title={item.name}
                              price={item.price}
                              imageUrl={item.imgUrl}
                              // types={item.goodOptions}
                              sellerName={item.sellerName}
                          />
                      ))}
            </div>
            <Pagination
                onChangePage={(page) => setCurrentPage(page)}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Home;
