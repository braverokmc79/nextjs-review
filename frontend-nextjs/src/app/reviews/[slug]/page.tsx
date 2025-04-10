
import React from "react";
import { Heading } from "@/components/Heading";
import { getReview ,getSlugs} from "@/lib/reviews";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({params}:Props): Promise<Metadata> {
  const {slug}=await  params;
  const review = await getReview(slug);

  return {
    title: review.title,
    description: review.body.slice(0, 150) + "…",
    openGraph: {
      title: review.title,
      description: review.body.slice(0, 150) + "…",
      images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}${review.image}` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: review.title,
      description: review.body.slice(0, 150) + "…",
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}${review.image}`],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL||""), 
  };

}



interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

const ReviewPage: React.FC<ReviewPageProps> = async ({ params }) => {
  const { slug } =await params;
  const review = await getReview(slug);



  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={review.image}
            alt={`영화 리뷰: ${review.title}`}
            width={640}
            height={360}
            className="w-full h-auto object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-6">
          <Heading className="text-2xl font-bold mb-2 text-center">
            {review.title}
          </Heading>
          <p className="text-sm text-gray-500 italic text-center pb-4">{review.date}</p>

          <ShareButtons />


          <Separator className="mb-4" />
          <article
            dangerouslySetInnerHTML={{ __html: review.body }}
            className="prose prose-slate mx-auto"
          />
          <Button  asChild className="mt-5 block mx-auto" variant="secondary">
            <Link href="/reviews">목록으로</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
