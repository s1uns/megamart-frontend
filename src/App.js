import logo from "./logo.svg";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import GoodBlock from "./components/GoodBlock";

import pizzas from "./assets/goods.json";
import { useState, useEffect } from "react";

function App() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        // Fetch data from an API
        fetch('https://localhost:7295/api/goods/list')
          .then(response => response.json())
          .then(
            data => {
                setItems(data)
            }
            );
      }, []); // Empty dependency array, runs only once

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">All goods</h2>
                    <div className="content__items">
                        {items.map((item) => {
                            return (
                                <GoodBlock
                                    key={item.id}
                                    title={item.name}
                                    price={item.price}
                                    imageUrl={item.imgUrl}
                                    // types={item.goodOptions}
                                ></GoodBlock>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
