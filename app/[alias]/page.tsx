// the structure for this file, the dynamic route `app/[alias]/page.tsx`, 
// comes from the example `app/blog/[slug]/page.tsx` reference in Next.js docs
// (https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

import getUrlByAlias from "@/lib/getUrlByAlias";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

// syntax here comes from: https://nextjs.org/docs/messages/blocking-prerender-dynamic
// (resolves the ``connection()` accessed outside of `<Suspense>`` error I was getting)
export const instant = false;

export default async function AliasPage({ 
    params 
}: { 
    params: Promise<{ alias: string }>      // syntax source: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
}) {
    const { alias } = await params;

    // await here comes directly from: https://nextjs.org/docs/app/api-reference/functions/connection
    // (resolves 'value can change between renders' error I was getting)
    await connection();

    // look up the alias in MongoDB:
    const aliasEntryInDB = await getUrlByAlias(alias);

    // show 404 error page if alias does not exist in the database
    // (https://nextjs.org/docs/app/api-reference/functions/not-found,
    // https://nextjs.org/docs/app/getting-started/error-handling):
    if (!aliasEntryInDB.success) {
        notFound();
    }

    // send user straight to original URL (no click needed) using server-side redirect() function
    // (as per mp-5 instructions and https://nextjs.org/docs/app/api-reference/functions/redirect):
    redirect(aliasEntryInDB.originalURL);
}