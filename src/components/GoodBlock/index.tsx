import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

export type GoodBlockProps = {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerName: string;
};

export const GoodBlock: FC<GoodBlockProps> = ({
    id,
    title,
    description,
    price,
    imageUrl,
    sellerName,
}) => {
    return (
        <div className="good-block-wrapper">
            <div className="good-block">
                <div className="good-block__img-container">
                    <img
                        className="good-block__img-container__image"
                        src={imageUrl}
                        alt="Good"
                    />
                    <div className="overlay">
                        <div className="text">
                            {description.length < 100
                                ? description
                                : description.substring(0, 97) + "..."}
                        </div>
                    </div>
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
};

