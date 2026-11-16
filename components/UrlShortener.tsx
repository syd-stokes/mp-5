// Slide 3 in Lecture 13 (10/27) gives us that: "the `use client` 
// directive must also be added when a React Hook is used in a component."
// So, we need it here to use useState and styled-components:
"use client";

import Header from "@/components/Header";
import ShortenForm from "@/components/ShortenForm";
import ShortenedUrlResult from "@/components/ShortenedUrlResult";
import { useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    min-width: 300px;
    margin: 110px auto;
`;

const StyledFormBox = styled.div`
    padding: 24px;
    padding-top: 1px;
    border: 2px solid #dddddd;
    border-radius: 8px;
`;

const StyledFormHeading = styled.h2`
    font-size: calc(6px + 1.4vw);
    font-weight: 700;
    margin-bottom: -7px;
`;

const StyledFormDescription = styled.p`
    font-size: calc(2px + 0.93vw);
    color: #666666;
    margin-bottom: 25px;
`;

// hold the shortened URL and lay out the header, form, and result
// (similar to the lab's PostsDisplay, which holds the posts state and
// passes an `append` function down to NewPostForm)
export default function UrlShortener() {
    const [shortenedUrl, setShortenedUrl] = useState("");   // resulting shortened URL (starts empty)

    return (
        <StyledWrapper>
            {/* page title and subtitle: */}
            <Header/>

            <StyledFormBox>
                <StyledFormHeading>Shorten a URL</StyledFormHeading>
                <StyledFormDescription>Enter some long URL below to create a shortened version</StyledFormDescription>

                {/* form w/ an onShorten function: */}
                <ShortenForm onShorten={(newShortenedUrl: string) => {setShortenedUrl(newShortenedUrl);}}/>

                {/* `key` gives each new short URL a fresh result component, 
                    so the "Copied" message gets reset for every new link
                    (Source: https://react.dev/learn/preserving-and-resetting-state): */}
                {shortenedUrl !== "" && <ShortenedUrlResult key={shortenedUrl} shortenedUrl={shortenedUrl} />}
            </StyledFormBox>
        </StyledWrapper>
    );
}