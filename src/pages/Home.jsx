import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import GoodBlock from "../components/GoodBlock";
import { useState, useEffect } from "react";
import Skeleton from "../components/GoodBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sortType, sortOrder, currentPage } = useSelector(
        (state) => state.filterSlice
    );
    const sortProperty = sortType.sortProperty;
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { searchValue } = useContext(SearchContext);

    const onChangeCategory = categoryId => {
        dispatch(setCategoryId(categoryId));
    };

    const onChangePage = page => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `https:localhost:7295/api/goods/list?page=${currentPage}&limit=5&category=${categoryId}&sortBy=${sortProperty}&order=${sortOrder}&search=${searchValue}`
            )
            .then((response) => {
                setItems(response.data.data);
                setTotalPages(response.data.totalPages);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortProperty, sortOrder, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => onChangeCategory(id)}
                />
                <Sort />
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
                currentPage={currentPage}
                onChangePage={onChangePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Home;
