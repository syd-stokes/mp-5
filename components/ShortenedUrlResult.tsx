// Slide 3 in Lecture 13 (10/27) gives us that: "the `use client` 
// directive must also be added when a React Hook is used in a component."
// So, we need it here to use styled-components:
"use client";

import StyledButton from "@/components/StyledButton";
import { useState } from "react";
import styled from "styled-components";

// holds the result box, Copy button, and note, with space between them
const StyledResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

// bordered box that holds the shortened URL
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

// small gray label above the shortened URL
const StyledResultLabel = styled.p`
    font-size: calc(3px + 0.85vw);
    color: #666666;
    margin-bottom: 3px;
`;

// the shortened URL itself: bold and dark, no underline
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

// display the shortened URL and let the user copy it (similar to the
// lab's PostPreview, which receives one post as a prop and displays it)
export default function ShortenedUrlResult({ shortenedUrl }: { shortenedUrl: string }) {
    const [hasCopied, setHasCopied] = useState(false);      // displays "Copied to clipboard!" note (starts hidden)

    // when user clicks "Copy" button:
    function handleCopy() {
        // copy the shortened URL to the user's clipboard
        // (source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText):
        navigator.clipboard.writeText(shortenedUrl);
        setHasCopied(true);     // show the "Copied to clipboard!" note
    }

    return (
        <StyledResultSection>
            {/* show any resulting short URL to the user: */}
            <StyledResultBox>
                <StyledResultLabel>Your shortened URL:</StyledResultLabel>
                <StyledShortURL href={shortenedUrl} target="_blank">{shortenedUrl}</StyledShortURL>
            </StyledResultBox>

            <StyledButton type="button" onClick={handleCopy}>Copy</StyledButton>
            {hasCopied && <StyledCopiedNote>Copied to clipboard!</StyledCopiedNote>}
        </StyledResultSection>
    );
}