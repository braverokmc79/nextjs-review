import { Heading } from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const ReviewsPage: React.FC = async () => {
  console.log("ReviewsPage");
  const reviews = await getReviews();

  return (
    <div className="w-full mx-auto px-4">
      <Heading className="text-3xl font-bold text-center mb-6">Reviews</Heading>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <li key={review.slug}>
            <Link href={`/reviews/${review.slug}`}>
              <Card className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={review.image}
                      alt={review.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
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
