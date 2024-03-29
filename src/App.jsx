import logo from "./logo.svg";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import GoodBlock from "./components/GoodBlock";

import { useState, useEffect } from "react";
import Skeleton from "./components/GoodBlock/Skeleton";

function App() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch("https://localhost:7295/api/goods/list")
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            });
    }, []);

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
                        {isLoading
                            ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
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
                </div>
            </div>
        </div>
    );
}

export default App;
