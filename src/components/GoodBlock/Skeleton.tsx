import React, { FC } from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: FC = () => (
    <ContentLoader
        className="good-block"
        speed={2}
        width={280}
        height={440}
        viewBox="0 0 280 440"
        backgroundColor="#b2a4a4"
        foregroundColor="#2d2a2a"
    >
        <rect x="156" y="306" rx="0" ry="0" width="14" height="0" />
        <rect x="1" y="0" rx="5" ry="5" width="280" height="280" />
        <rect x="0" y="363" rx="10" ry="10" width="93" height="30" />
        <rect x="0" y="300" rx="10" ry="10" width="280" height="35" />
        <rect x="138" y="349" rx="19" ry="19" width="140" height="45" />
        <rect x="0" y="405" rx="11" ry="11" width="276" height="24" />
    </ContentLoader>
);

