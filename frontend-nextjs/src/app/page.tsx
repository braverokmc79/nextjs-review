import { Heading } from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export const metadata = {
  title: {
    default: "Home | Indie Gamer",
    template: "%s | Indie Gamer",
    description: "Only the best indie games, reviewd for you.",
  }  
};


const HomePage: React.FC = async () => {
 
  const review  = await getFeaturedReview();

  return (
    <div className="w-full mx-auto px-4">
      <Heading className="text-3xl font-bold text-center mb-6">Review</Heading>
      <ul className="w-full max-w-3xl mx-auto justify-center items-center  gap-6">
     
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

                <CardContent className="p-4 flex-grow flex items-center justify-center">
                  <CardTitle className="text-lg font-semibold text-center truncate w-full">
                    {review.body}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          </li>
       
      </ul>
    </div>
  );
};

export default HomePage;
