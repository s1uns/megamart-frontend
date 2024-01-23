import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

export default function GoodBlock({ id, title, price, imageUrl, sellerName }) {
    return (
        <div className="good-block-wrapper">
            <div className="good-block">
                <div className="good-block__img-container">
                    <img
                        className="good-block__img-container__image"
                        src={imageUrl}
                        alt="Good"
                    />
                </div>
                <h4 className="good-block__title">{title}</h4>
                <div className="good-block__bottom">
                    <div className="good-block__price">{price} $</div>
                    <div className="seller">
                        <div> Seller:</div>
                        <div className="name">{sellerName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
