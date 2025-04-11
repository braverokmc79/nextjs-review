import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getReviews } from "@/lib/reviews";

export const dynamic = "force-dynamic";


export const metadata = {
  title: {
    default: "Home | Indie Gamer",
    template: "%s | Indie Gamer",
    description: "Only the best indie games, reviewd for you.",
  }  
};


const HomePage: React.FC = async () => {
  
  const reviews = await getReviews(6);

  return (
    <div className="w-full mx-auto px-4">
      <Heading className="text-3xl font-bold text-center mb-6">Review</Heading>
      <ul className="w-full  mx-auto justify-center items-center  gap-6">
     
        {reviews.map((review) => (
          <li key={review.slug}>
            <Link href={`/reviews/${review.slug}`}>
              <Card className="overflow-hidden
                grid 
                grid-cols-[40%_60%]
                md:grid-cols-[20%_80%] gap-4
                my-4
                rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white
              ">
                <CardHeader className="p-0 items-center  ">
                <Image
                      src={review.image}
                      alt={review.title}
                      width={360}
                      height={360}
                      className="w-full h-full object-cover rounded-lg
                       aspect-[4/3] md:aspect-[16/9]
                       left-2 relative md:left-0  md:p-3
                       transition-transform transform hover:scale-105 hover:shadow-lg
                      "
                    />
                </CardHeader>
                <CardContent className="">
                  <CardTitle className="text-lg  md:text-2xl font-bold  py-5 
                     flex  flex-col md:flex-row
                     items-center justify-between">
                    <div>                     
                      {review.title}   
                    </div>
                    <small className="text-gray-500 dark:text-gray-400 text-md px-3">
                      {review.date}
                    </small>
                  </CardTitle>

                  <CardTitle className="text-sm md:text-lg w-full  md:block text-gray-500 dark:text-gray-400">
                    {review.subtitle}
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

export default HomePage;
