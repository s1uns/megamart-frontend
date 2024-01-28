import React, { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>🤷‍♂️</span>
                <br />
                Nothing found
            </h1>
            <p className={styles.description}>No such page on the store</p>
        </div>
    );
};
