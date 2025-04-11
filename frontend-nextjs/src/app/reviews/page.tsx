import { Heading } from "@/components/Heading";
import { getReviews, Review } from "@/lib/reviews";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ReviewsPage: React.FC = async () => {
  console.log("ReviewsPage");
  const reviews = await getReviews(6);
  //console.log("review===========>", reviews);

  return (
    <div className="w-full mx-auto px-4">
      <Heading className="flex items-center justify-between mb-6">
         <div className="w-full text-2xl font-bold text-center items-center mb-4">
            Reviews
        </div>
        <Button asChild  variant="default"  >
          <Link  href={"/reviews/new"}  className="text-sm">리뷰 작성</Link>
        </Button>
      </Heading>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review : Review, index: number) => (
          <li key={review.slug}>
            <Link href={`/reviews/${review.slug}`}>
              <Card className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                  {review.image && <Image
                      priority={index < 3} 
                      src={review.image}
                      alt={review.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  }
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex items-center justify-center">
                  <CardTitle className="text-lg font-semibold text-center truncate w-full">
                    {review.title}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
