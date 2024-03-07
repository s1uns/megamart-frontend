import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoodBlockProps } from "../GoodBlock";
import GoodSkeleton from "../../pages/GoodSkeleton";
import styles from "./SellerPublicProfile.module.scss";
import { formatDate } from "../../utils/formatDate";
import { Verified } from "./Verified";

type SellerInfo = {
    email: string;
    phoneNumber: string;
    createdAt: string;
    profilePicUrl: string;
    name: string;
    websiteUrl: string;
    goods: GoodBlockProps[];
    isVerified: boolean;
};

export const SellerPublicProfile: FC = () => {
    const { id } = useParams();
    const [sellerInfo, setSellerInfo] = useState<SellerInfo>();

    useEffect(() => {
        async function fetchSeller() {
            try {
                const { data } = await axios.get(
                    `https:localhost:7295/api/Profile/sellers/${id}`
                );
                setSellerInfo(data);
            } catch (error) {
                setSellerInfo(undefined);
            }
        }

        fetchSeller();
    }, [id]);

    if (!sellerInfo) {
        return <GoodSkeleton />;
    }

    return (
        <>
            <div className={styles["seller-block"]}>
                <div className={styles["seller-block__img-container"]}>
                    <img src={sellerInfo.profilePicUrl} />
                </div>
                <div className={styles["seller-block__info"]}>
                    <h1>
                        {sellerInfo.name}
                        {sellerInfo.isVerified && <Verified />}
                    </h1>
                    <p>Email: {sellerInfo.email}</p>
                    <p>Phone number: {sellerInfo.phoneNumber}</p>
                    <p>
                        Private website:{" "}
                        <a href={sellerInfo.websiteUrl} target="_blank">
                            {sellerInfo.websiteUrl}
                        </a>
                    </p>
                    <p>On MegaMart since: {formatDate(sellerInfo.createdAt)}</p>
                    <p>Overall shop rating: ★ ★ ★ ☆ ☆</p>
                </div>
            </div>
        </>
    );
};
