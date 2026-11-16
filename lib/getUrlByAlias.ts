// base `getUrlByAlias.ts` file structure (with minor changes) comes directly 
// from Week 9 lab: "Next.js: Persistence with MongoDB" (https://learn.bu.edu/ultra/courses/
// _364942_1/document/_18261730_1?view=content&state=view)

import getCollection, { URLS_COLLECTION } from "@/db";
import { AliasProps } from "@/type";
import createFailedResult from "@/lib/createFailedResult";

export default async function getUrlByAlias(alias: string): Promise<AliasProps> {
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const data = await urlsCollection.findOne({ alias: alias });  

    // if alias doesn't exist in MongoDB:
    if (data === null)  return createFailedResult("No link found for this alias.");

    // map MongoDB document into AliasProps type (same idea as `getAllPosts.ts` file from Week 9 lab)
    const entry: AliasProps = {
        success: true,
        errorMessage: "",
        alias: data.alias,      // alias found in MongoDB
        originalURL: data.url,      // original URL found in MongoDB
    };
    
  return entry;
}