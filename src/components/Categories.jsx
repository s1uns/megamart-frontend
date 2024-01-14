import React, { useState, useEffect } from "react";

export default function Categories({ value, onClickCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7295/api/categories/list")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    return (
        <div className="categories">
            <ul>
                <li
                    style={{ backgroundColor: "#9b59b6" }}
                    onClick={() => onClickCategory('')}
                    className={value === '' ? "active" : ""}
                >
                    All
                </li>
                {categories.map((item) => {
                    return (
                        <li
                            style={{
                                backgroundColor: `#${
                                    item.backgroundColor
                                        ? item.backgroundColor
                                        : "9b59b6"
                                }`,
                                color: `#${item.fontColor}`,
                            }}
                            key={item.id}
                            onClick={() => onClickCategory(item.id)}
                            className={value === item.id ? "active" : ""}
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
