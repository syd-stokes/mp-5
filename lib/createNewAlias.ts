"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { AliasProps } from "@/type";

// helper function to validate URLs:
function isValidUrl(input: string): boolean {
    // if the input cannot be parsed as a URL, it is not valid
    // (https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static):
    if (!URL.canParse(input)) {
        return false;
    }

    // create URL object (https://developer.mozilla.org/en-US/docs/Web/API/URL/URL):
    const parsedURL = new URL(input);

    // if URL is not a web link, it is not valid
    // (https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol):
    if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        return false;
    }

    // check URL domain (https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname):
    const hostname = parsedURL.hostname;

    // if there's not at least one dot ("example.com"), it is not valid:
    if (!hostname.includes(".")) {
        return false;
    }

    // if it starts or ends w/ a dot, or has two dots in a row 
    // ("https://.com" or "https://example." or "https://example..com"),
    // it is not valid:
    if (hostname.startsWith(".") || hostname.endsWith(".") || hostname.includes("..")) {
        return false;
    }

    // the last dot must be at least 2 characters from the end (allows URLs that 
    // end in ".com", ".edu", or ".io", but blocks things like "https://example.c")
    const lastDotPosition = hostname.lastIndexOf(".");
    const charactersAfterLastDot = hostname.length - lastDotPosition - 1;
    if (charactersAfterLastDot < 2) {
        return false;
    }

    // if the URL is valid, return true
    return true;
}

// helper function to validate aliases:
function isValidAlias(alias: string): boolean {
    // empty aliases not allowed:
    if (alias.length === 0) {
        return false;
    }

    // every char an alias can have
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZZ0123456789-_";   
    
    // check the alias by looping through one character at a time
    for (let i = 0; i < alias.length; i++) {
        const char = alias[i];  

        // if this character is not in the allowed list, the alias is invalid
        if (!allowedChars.includes(char)) {
            return false;
        }
    }

    // every character passed the check
    return true;
}

// format of createNewAlias function closely follows 
// createNewPost function from Week 9 lab:
export default async function createNewAlias(
    url: string,
    alias: string,
): Promise<AliasProps> {
    console.log("creating new alias");
    const p = {
        alias: alias.trim(),
        url: url.trim(),    // trim?
    };

    // if URL is invalid, return error:
    if (!isValidUrl(p.url)) {
        return {
            success: false,
            errorMessage: "Invalid URL: Could not verify URL. Please try again.",
            alias: "",
            originalURL: "",
        };
  }

    // if alias is invalid, return error:
    if (!isValidAlias(p.alias)) {
        return {
            success: false,
            errorMessage: "Invalid alias: You may only use valid URL characters.",
            alias: "",
            originalURL: "",
        };
    }

    // get MongoDB collection
    const urlsCollection = await getCollection(URLS_COLLECTION);

    // check if alias already exists, and reject the duplicate if it does:
    const existing = await urlsCollection.findOne({ alias: p.alias });
    if (existing !== null) {
        return {
            success: false,
            errorMessage: "Invalid alias: This alias already exists.",
            alias: "",
            originalURL: "",
        };
    }

    // insert in DB
    const res = await urlsCollection.insertOne({ ...p });   
    
    // check if insert was successful
    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    // map MongoDB document into AliasProps type
    return {
        success: true,
        errorMessage: "",
        alias: p.alias,
        originalURL: p.url,
    };
}