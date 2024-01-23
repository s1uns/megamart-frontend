import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

const FullGood = () => {
    const { id } = useParams();
    const [goodInfo, setGoodInfo] = useState();
    const [activeOption, setActiveOption] = useState();
    const count =
        useSelector((state) =>
            state.cart.items
                .filter((item) => item.id === id)
                .reduce((count, item) => count + item.count, 0)
        ) || 0;

    const dispatch = useDispatch();
    const onClickAdd = () => {
        const item = {
            id: goodInfo.id,
            title: goodInfo.name,
            price: goodInfo.price,
            imageUrl: goodInfo.imgUrl,
            sellerName: goodInfo.sellerName,
            option: activeOption.optionName || "",
        };

        dispatch(addItem(item));
    };

    useEffect(() => {
        async function fetchGood() {
            try {
                const { data } = await axios.get(
                    `https:localhost:7295/api/goods/${id}`
                );
                setGoodInfo(data);
                console.log(data.goodOptions);
                setActiveOption(
                    data.goodOptions.length > 0 ? data.goodOptions[0] : {}
                );
            } catch (error) {
                setGoodInfo({});
            }
        }

        fetchGood();
    }, [id]);

    if (!goodInfo) {
        return "Loading...";
    }

    return Object.keys(goodInfo).length > 0 ? (
        <div className="good-info">
            <div className="good-info__img-container">
                <img src={goodInfo.imgUrl} />
            </div>
            <div className="good-info__description">
                <div className="top">
                    <h1>{goodInfo.name}</h1>
                    <p>{goodInfo.price} $</p>
                </div>
                <div className="bottom">
                    <p>{goodInfo.description}</p>
                </div>
            </div>
            <div className="good-info__selection">
                <div
                    className={
                        goodInfo.goodOptions.length > 0
                            ? "good-info__selector"
                            : "good-info__selector hidden"
                    }
                >
                    <ul>
                        {goodInfo.goodOptions.map((type) => (
                            <li
                                className={
                                    activeOption.id === type.id ? "active" : ""
                                }
                                onClick={() => setActiveOption(type)}
                                key={type.id}
                            >
                                {type.optionName ? type.optionName : null}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className="button button--outline button--add"
                    onClick={onClickAdd}
                >
                    <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Add</span>
                    {count > 0 && <i>{count}</i>}
                </button>
            </div>
        </div>
    ) : (
        <NotFound />
    );
};

export default FullGood;
