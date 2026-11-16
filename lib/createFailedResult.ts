import { AliasProps } from "@/type";

// builds the AliasProps object returned whenever something goes wrong, so the
// same failure object isn't written out in several places (DRY) -->
// used by `createNewAlias.ts` and `getUrlByAlias.ts` files
export default function createFailedResult(errorMessage: string): AliasProps {
    const failedResult: AliasProps = {
        success: false,             // unsuccessful at finding alias
        errorMessage: errorMessage,     // error message to display
        alias: "",              // invalid alias
        originalURL: "",        // doesn't redirect anywhere
    };
    return failedResult;
}