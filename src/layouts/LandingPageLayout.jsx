import React from 'react';
import Header from './../component/Header';

const LandingPageLayout = ({ children }) => {
    const sections = [
        { title: "Technology", url: "#" },
        { title: "Design", url: "#" },
        { title: "Culture", url: "#" },
        { title: "Business", url: "#" },
        { title: "Politics", url: "#" },
        { title: "Opinion", url: "#" },
        { title: "Science", url: "#" },
        { title: "Health", url: "#" },
        { title: "Style", url: "#" },
        { title: "Travel", url: "#" },
    ];
    return (
        <div>
            <Header sections={sections} />
            <div>{children}</div>
        </div>
    );
};

export default LandingPageLayout;
