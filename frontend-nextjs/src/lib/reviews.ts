import { notFound } from "next/navigation";
import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export type Review ={
  slug: string,
  title: string,
  date: string,
  image: string,
  body: string,
}


export async function getReview(slug:string){
  try {
    const response =await readFile(`./content/reviews/${slug}.json`, "utf-8");
    const {title, date, image, body}  =JSON.parse(response);  
    return {slug,title, date, image, body};
  } catch (error) { 
    console.log(`Error reading review file: ${slug}.json`, error);   
    throw notFound();
  }  
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}


export async function getReviews() {
  const files = await readdir('./content/reviews');
  const slugs = files.filter((file) => file.endsWith('.json')).map((file) => file.slice(0, -'.json'.length));
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  reviews.sort((a, b) => b.date.localeCompare(a.date));
  return reviews;
}


export async function getSlugs() {
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.json')).map((file) => file.slice(0, -'.json'.length));
  
}






export async function getReview2(slug:string) {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}
