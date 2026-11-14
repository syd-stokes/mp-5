// Slide 3 in Lecture 13 (10/27) gives us that: "the `use client` 
// directive must also be added when a React Hook is used in a component."
// So, we need it here to use styled-components, useState, and useEffect:
"use client";

import createNewAlias from "@/lib/createNewAlias";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    min-width: 300px;
    margin: 110px auto;
`;

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

const StyledFormBox = styled.div`
    padding: 24px;
    padding-top: 1px;
    border: 2px solid #dddddd;
    border-radius: 8px;
`;

const StyledBoxHeading = styled.h2`
    font-size: calc(6px + 1.4vw);
    font-weight: 700;
    margin-bottom: -7px;
`;

const StyledBoxDescription = styled.p`
    font-size: calc(2px + 0.93vw);
    color: #666666;
    margin-bottom: 25px;
`;

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

const StyledButton = styled.button`
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #dd6da5ff;
    color: #ffffff;
    font-size: calc(2px + 0.93vw);
    font-weight: 700;   

    &:hover {
        background: #e891bdff;
    }
`;

const StyledError = styled.p`
    color: #cc1111ff;
    font-weight: 700;
    font-size: calc(2px + 0.93vw);
`;

const StyledResultBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    padding-top: 2px;
    margin-top: 15px;
    margin-bottom: 4px;
    border: 2px solid #dddddd;
    border-radius: 8px;
`;

const StyledResultLabel = styled.p`
    font-size: calc(3px + 0.85vw);
    color: #666666;
    margin-bottom: 3px;
`;

const StyledShortURL = styled.a`
    color: #111111;
    font-size: calc(2px + 1.05vw);
    font-weight: 700;
    text-decoration: none;
    word-break: break-all;  
    margin-bottom: 4px;

    &:hover {
        text-decoration: underline;
    }
`;

// small note shown after the user copies the short URL
const StyledCopiedNote = styled.p`
    color: #2e7d32;
    font-weight: 700;
    font-size: calc(5px + 0.85vw);
    text-align: center;
    margin-bottom: 1px;
    margin-top: 15px;
`;

export default function ShortenForm() {
    // state variables for the form inputs and results:
    const [url, setUrl] = useState("");             // user's URL input (starts empty)
    const [alias, setAlias] = useState("");         // user's alias input (starts empty)
    const [errorMessage, setErrorMessage] = useState("");       // error message (starts empty)
    const [shortenedUrl, setShortenedUrl] = useState("");       // resulting shortened URL (starts empty)
    const [currentSiteAddress, setCurrentSiteAddress] = useState("");       // current site address (for displaying in front of the alias; starts empty)
    const [hasCopied, setHasCopied] = useState(false);          // displays "Copied to clipboard!" note (starts hidden)


    // set current site address to display before the alias input:
    useEffect(() => {
        setCurrentSiteAddress(window.location.origin);      // `window.location.origin` source: https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
    }, []);


    // form submission when user clicks "Shorten" button:
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {        // header syntax source: https://react.dev/learn/typescript#typing-dom-events
        event.preventDefault();     // stop the page from reloading (so the result can be shown on the same page)
        setHasCopied(false);       // hide any previous "Copied to clipboard!" note

        // try to create a new alias:
        const newAlias = await createNewAlias(url, alias);

        if (newAlias.success) {       // if the alias was created successfully, set the shortened URL:
            setShortenedUrl(currentSiteAddress + "/" + newAlias.alias);
            setErrorMessage("");
        } else {        // o/w show error message:
            setErrorMessage(newAlias.errorMessage);
            setShortenedUrl("");
        }
    }


    // when user clicks "Copy" button:
    function handleCopy() {
        // copy the shortened URL to the user's clipboard
        // (source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText):
        navigator.clipboard.writeText(shortenedUrl);

        setHasCopied(true);     // show the "Copied to clipboard!" note
    }


    return (
        <StyledWrapper>
            <StyledTitle>CS303 URL Shortener</StyledTitle>
            <StyledSubtitle>Welcome to my MP-5, where you can shorten any long URLs!</StyledSubtitle>

            <StyledFormBox>
                <StyledBoxHeading>Shorten a URL</StyledBoxHeading>
                <StyledBoxDescription>Enter some long URL below to create a shortened version</StyledBoxDescription>

                <StyledForm onSubmit={handleSubmit}>
                    {/* URL input: */}
                    <StyledLabel htmlFor="urlInput">URL</StyledLabel>
                    <StyledInput id="urlInput" placeholder="https://example.com/your/long/url/here" value={url} onChange={(e) => setUrl(e.target.value)} required/>

                    {/* alias input: */}
                    <StyledLabel htmlFor="aliasInput">Custom Alias</StyledLabel>
                    <StyledAliasLine>
                        <StyledSiteAddress>{currentSiteAddress}/</StyledSiteAddress>
                        <StyledInput id="aliasInput" placeholder="your-custom-alias-here" value={alias} onChange={(e) => setAlias(e.target.value)} required/>
                    </StyledAliasLine>

                    {/* shorten button: */}
                    <StyledButton type="submit">Shorten</StyledButton>

                    {/* show any error to the user: */}
                    {errorMessage !== "" ? <StyledError>{errorMessage}</StyledError> : null}    

                    {/* show any resulting short URL to the user: */}
                    {shortenedUrl !== "" ? (
                        <>
                            <StyledResultBox>
                                <StyledResultLabel>Your shortened URL:</StyledResultLabel>
                                <StyledShortURL href={shortenedUrl} target="_blank">{shortenedUrl}</StyledShortURL>    {/* display the short URL */}
                            </StyledResultBox>
                            
                            <StyledButton type="button" onClick={handleCopy}>Copy</StyledButton>
                            {hasCopied && <StyledCopiedNote>Copied to clipboard!</StyledCopiedNote>}        {/* show "Copied to clipboard!" message */}
                        </>
                    ): null}
                </StyledForm>
            </StyledFormBox>
        </StyledWrapper>
  );
}