import React from "react";
import cartEmptyImg from "../assets/img/megaMartEmptyCart.png";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                The cart is empty <span>😕</span>
            </h2>
            <p>
                You haven't ordered anything yet.
                <br />
                Go to the main page and make an order.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Go back</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
