import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidateTag } from "next/cache";


export async function POST( request: Request) {
    const payload = await request.json();
    if(payload&& payload.model==="review"){
        revalidateTag(CACHE_TAG_REVIEWS);
        console.log("revalidated: ",payload);
    }
    return new Response(null, {status: 200,});
}