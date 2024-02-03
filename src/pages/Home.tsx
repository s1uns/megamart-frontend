import { FC, useCallback } from "react";
import { Categories } from "../components/Categories";
import { sortList } from "../components/Sort";
import { useEffect, useRef } from "react";

import { Sort, GoodBlock, Skeleton, Pagination } from "../components";
import { useSelector } from "react-redux";
import {
    initialState,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import { Filters, fetchGoods } from "../redux/slices/goodsSlice";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const { categoryId, sortType, sortOrder, currentPage, searchValue } =
        useSelector((state: RootState) => state.filter);
    const { items, totalPages, status } = useSelector(
        (state: RootState) => state.goods
    );
    const isFilter = useRef(false);
    const isMounted = useRef(false);
    const sortProperty = sortType.sortProperty;
    const navigate = useNavigate();
    const onChangeCategory = useCallback((categoryId: string) => {
        dispatch(setCategoryId(categoryId));
    }, []);

    if (currentPage + 1 > totalPages) {
        dispatch(setCurrentPage(totalPages - 1 >= 0 ? totalPages - 1 : 0));
    }

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getGoods = async () => {
        try {
            dispatch(
                fetchGoods({
                    currentPage,
                    categoryId,
                    sortProperty,
                    sortOrder,
                    searchValue,
                })
            );
// setTotalPages(items.data.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    //If params were changed and the first render occured
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                sortOrder,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sortProperty, sortOrder, searchValue, currentPage]);

    //If the first render occured, then check the URL and set filters to redux storage
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as Filters;
            const sortType = sortList.find(
                (sortType) => sortType.sortProperty === params.sortProperty
            );
            if (
                initialState.categoryId === params.categoryId &&
                initialState.sortType === sortType &&
                initialState.currentPage === Number(params.currentPage)
            ) {
                getGoods();
            }

            dispatch(
                setFilters({ ...params, sortType: sortType || sortList[0] })
            );
            isFilter.current = true;
        }
    }, []);

    //If params were changed and the first render occured
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                sortOrder,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sortProperty, sortOrder, searchValue, currentPage]);

    //If the first render occured, fetch the items
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isFilter.current) {
            getGoods();
        }

        isFilter.current = false;
    }, [categoryId, sortProperty, sortOrder, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort sortType={sortType} sortOrder={sortOrder} />
            </div>
            <h2 className="content__title">All items</h2>
            {status === "failed" ? (
                <div className="content__error-info">
                    <h2>
                        Failed to get the goods <span>😕</span>
                    </h2>
                    <p>Try again later.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "processing"
                        ? [...new Array(12)].map((_, index) => (
                              <Skeleton key={index} />
                          ))
                        : items.map((item: any) => (
                              <Link key={item.id} to={`/goods/${item.id}`}>
                                  <GoodBlock
                                      id={item.id}
                                      title={item.name}
                                      description={item.description}
                                      price={item.price}
                                      imageUrl={item.imgUrl}
                                      sellerName={item.sellerName}
                                  />
                              </Link>
                          ))}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Home;
