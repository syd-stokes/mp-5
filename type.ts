// AliasProps defines the structure of the object returned by the createNewAlias 
// function (contains info about the success/failure of the alias creation)

export type AliasProps = {
    success: boolean;        // true if alias saved to MongoDB, else false (if invalid URL/alias, etc)
    errorMessage: string;   // error msg when unsuccessful (empty string when successful)
    alias: string;      // saved user alias
    originalURL: string;    // URL that alias redirects to
};