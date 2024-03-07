import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoodBlock, GoodBlockProps } from "../GoodBlock";
import GoodSkeleton from "../../pages/GoodSkeleton";
import styles from "./SellerPublicProfile.module.scss";
import { formatDate } from "../../utils/formatDate";
import { Verified } from "./Verified";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
            <hr />
            <h1 style={{ marginLeft: "25px" }}>{sellerInfo.name}'s Goods</h1>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3000}
                centerMode={false}
                className={styles.carousel}
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024,
                        },
                        items: 4.5,
                        partialVisibilityGutter: 40,
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                    },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={2}
                swipeable
            >
                {sellerInfo.goods.map((item: any) => (
                    <Link key={item.id} to={`/goods/${item.id}`}>
                        <GoodBlock
                            id={item.id}
                            title={item.name}
                            description={item.description}
                            price={item.price}
                            imageUrl={item.imgUrl}
                            sellerName={item.sellerName}
                        />
                    </Link>
                ))}
            </Carousel>
            <hr />
        </>
    );
};
