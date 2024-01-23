import React from "react";
import ContentLoader from "react-content-loader";

const GoodSkeleton = () => (
    <ContentLoader
        speed={2}
        width={1400}
        height={885}
        viewBox="0 0 1400 885"
        backgroundColor="#b2a4a4"
        foregroundColor="#2d2a2a"
    >
        <rect x="30" y="20" rx="0" ry="0" width="650" height="650" />
        <rect x="1025" y="680" rx="15" ry="15" width="350" height="100" />
        <rect x="694" y="40" rx="0" ry="0" width="352" height="100" />
        <rect x="1225" y="40" rx="0" ry="0" width="150" height="100" />
        <rect x="694" y="184" rx="0" ry="0" width="681" height="486" />
        <rect x="30" y="680" rx="15" ry="15" width="650" height="100" />
    </ContentLoader>
);

export default GoodSkeleton;
