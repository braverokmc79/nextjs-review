import { marked } from "marked";
import { notFound } from "next/navigation";

import qs from "qs";


const  CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

export interface GetReviewData {
  id: number;
  attributes: {
    slug: string;
    title: string;
    subtitle: string;
    publishedAt: string; // ISO date string
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export type Review ={
  slug: string,
  title: string,
  date: string,
  image: string,
  body: string,
  subtitle: string,
  id: number;
}


function toReview(item :GetReviewData){
  const {id} = item;
  const {attributes} = item;
  const {slug, title, subtitle, publishedAt} = attributes;
  const image = CMS_URL+attributes.image.data.attributes.url;
  const date=publishedAt.slice(0,"yyyy-mm-dd".length);
  return {id, slug, title, subtitle, date, image};
}

export async function fetchReviews(parameters:object) {    
  const url = `${CMS_URL}/api/reviews?`
         + qs.stringify(parameters, { encodeValuesOnly: true });    
    //console.log(" [fetchReviews] url: ", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CMS returned ${response.status} for ${url} `);
    }
    return await response.json();
}


export async function getReview(slug:string) :Promise<Review | null> {
  console.log(" ✅캐싱 확인: ", slug);
  try {
    const {data} = await fetchReviews({                        
      filters:{slug: {$eq: slug}},
      fields: ["slug", "title", "subtitle" ,"publishedAt", "body"],
      populate: { image: { fields: ["url"] } },
      pagination: { pageSize:1, withCount: false },
    });
    if (data.length === 0) {
      return null;
    }

    const item = data[0];
    return{
      ...toReview(item),      
      body: await marked(item.attributes.body),
    }   
  } catch (error) {
    console.error("Error fetching review:", error);
    notFound();
  }     
}

export async function getReviews(pageSize:number = 6): Promise<Review[]> {        
    const {data} = await fetchReviews({            
      fields: ["slug", "title", "subtitle" ,"publishedAt"],
      populate: { image: { fields: ["url"] } },
      sort: ["publishedAt:desc"],
      pagination: { pageSize:pageSize}
    });
    return data.map((item :GetReviewData) => toReview(item));  
}


export async function getSlugs() {
  const {data} = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],    
    pagination: { pageSize: 1000 },
  });
  return data.map((item :GetReviewData) =>item.attributes.slug );  
}


export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}



