import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Rating } from "@mui/material";

export type GoodBlockProps = {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerName: string;
    rating: number;
};

export const GoodBlock: FC<GoodBlockProps> = ({
    id,
    title,
    description,
    price,
    imageUrl,
    sellerName,
    rating,
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
                    <div className="good-block__rating">
                        <Rating
                            name="size-small"
                            defaultValue={rating}
                            precision={0.5}
                            size="small"
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
