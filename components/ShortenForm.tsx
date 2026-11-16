// Slide 3 in Lecture 13 (10/27) gives us that: "the `use client` 
// directive must also be added when a React Hook is used in a component."
// So, we need it here to use useState, useEffect, and styled-components:
"use client";

import createNewAlias from "@/lib/createNewAlias";
import StyledButton from "@/components/StyledButton";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
`;

const StyledLabel = styled.label`
    font-weight: 500;
    font-size: calc(2px + 1.15vw);
    margin-bottom: -5px;
`;

const StyledInput = styled.input`
    padding: 12px;
    border: 2px solid #dddddd;
    border-radius: 8px;
    font-size: calc(2px + 0.97vw);
    margin-bottom: 12px;
`;

// puts the site address and the alias input on the same line
const StyledAliasLine = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StyledSiteAddress = styled.span`
    font-size: calc(2px + 0.97vw);
    color: #666666;
    margin-top: -10px;
    word-break: break-all;
`;  // source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-break

const StyledError = styled.p`
    color: #cc1111ff;
    font-weight: 700;
    font-size: calc(2px + 0.93vw);
`;

// onShorten is a function passed in from UrlShortener (same idea as `append` in the
// lab's `NewPostForm.tsx` file), used to send the new shortened URL back up to the parent.
export default function ShortenForm({
    onShorten,
}: {
    onShorten: (newShortenedUrl: string) => void;
}) {
    // state variables for the form inputs and error:
    const [url, setUrl] = useState("");                     // user's URL input (starts empty)
    const [alias, setAlias] = useState("");                 // user's alias input (starts empty)
    const [errorMessage, setErrorMessage] = useState("");   // error message (starts empty)
    const [currentSiteAddress, setCurrentSiteAddress] = useState("");   // current site address (for displaying in front of the alias; starts empty)

    // set current site address to display before the alias input:
    useEffect(() => {
        setCurrentSiteAddress(window.location.origin);      // `window.location.origin` source: https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
    }, []);

    // form submission when user clicks "Shorten" button:
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {   // header syntax source: https://react.dev/learn/typescript#typing-dom-events
        event.preventDefault();     // stop the page from reloading (so the result can be shown on the same page)

        // try to create a new alias:
        const newAlias = await createNewAlias(url, alias);

        if (newAlias.success) {       // created successfully
            setErrorMessage("");       // clear any previous error message
            onShorten(currentSiteAddress + "/" + newAlias.alias);      
        } else {        // o/w show the error and clear any previous result:
            setErrorMessage(newAlias.errorMessage);
            onShorten("");
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            {/* URL input: */}
            <StyledLabel htmlFor="urlInput">URL</StyledLabel>
            <StyledInput id="urlInput" placeholder="https://example.com/your/long/url/here" value={url} onChange={(e) => setUrl(e.target.value)} required/>

            {/* custom alias input: */}
            <StyledLabel htmlFor="aliasInput">Custom Alias</StyledLabel>
            <StyledAliasLine>
                <StyledSiteAddress>{currentSiteAddress}/</StyledSiteAddress>
                <StyledInput id="aliasInput" placeholder="your-custom-alias-here" value={alias} onChange={(e) => setAlias(e.target.value)} required/>
            </StyledAliasLine>

            {/* shorten button: */}
            <StyledButton type="submit">Shorten</StyledButton>

            {/* show any error to the user: */}
            {errorMessage !== "" ? <StyledError>{errorMessage}</StyledError> : null} 
        </StyledForm>
    );
}