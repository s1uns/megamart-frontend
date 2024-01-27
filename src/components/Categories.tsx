import React, { useState, useEffect, FC, memo } from "react";

type CategoriesProps = {
    value: string;
    onClickCategory: (categoryId: string) => void;
};

type Category = {
    id: string;
    name: string;
    backgroundColor: string;
    fontColor: string;
};

const Categories: FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);

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
                    onClick={() => onClickCategory("")}
                    className={value === "" ? "active" : ""}
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
});

export default Categories;
