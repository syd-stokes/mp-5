// Slide 3 in Lecture 13 (10/27) gives us that: "the `use client` 
// directive must also be added when a React Hook is used in a component."
// So, we need it here to use styled-components:
"use client";

import styled from "styled-components";

const StyledTitle = styled.h1`
    font-size: calc(9px + 2vw);
    font-weight: 700;
    margin-bottom: -10px;
    text-align: center;
`;

const StyledSubtitle = styled.p`
    font-size: calc(5px + 0.97vw);
    color: #666666;
    text-align: center;
    margin-bottom: 35px;
`;

// display the page title and subtitle:
export default function Header() {
    return (
        <header>
            <StyledTitle>CS303 URL Shortener</StyledTitle>
            <StyledSubtitle>Welcome to my MP-5, where you can shorten any long URLs!</StyledSubtitle>
        </header>
    );
}