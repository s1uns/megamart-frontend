import React, { useState } from "react";

export default function GoodBlock({ title, price, imageUrl, sellerName }) {
    const [goodCount, setGoodCount] = useState(0);
    // const [activeType, setActiveType] = useState(types[0].id);
    const onClickAdd = () => {
        setGoodCount(goodCount + 1);
    };

    return (
        <div className="good-block">
            <div className="good-block__img-container">
                <img
                    className="good-block__img-container__image"
                    src={imageUrl}
                    alt="Good"
                />
            </div>
            <h4 className="good-block__title">{title}</h4>
            {/* <div className="good-block__selector">
                <ul>
                    {types.map(type => (
                        <li
                            className={activeType === type.id ? "active" : ""}
                            onClick={() => setActiveType(type.id)}
                            key={type.id}
                        >
                            {type.optionName}
                        </li>
                    ))}
                </ul>
            </div> */}
            <div className="good-block__bottom">
                <div className="good-block__price">{price} $</div>
                <button
                    className="button button--outline button--add"
                    onClick={onClickAdd}
                >
                    <svg
                        width="12"
                        height="12"
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
                    <i>{goodCount}</i>
                </button>
                <div className="seller">
                    <div> Seller:</div>
                    <div className="name">{sellerName}</div>
                </div>
            </div>
        </div>
    );
}
