'use client';
import React, { useActionState , startTransition, useEffect} from "react";

import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createReview, ReviewFormFormState } from "@/actions/reviews/create-review";

const ReviewNewPage = () => {
  const router = useRouter();
  
  const [formState, action, isPending] = useActionState(createReview,  {} as ReviewFormFormState );
  
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  useEffect(() => {
    if (formState.success && !isPending) {
      toast.success("리뷰가 등록되었습니다.");
      alert("리뷰가 등록되었습니다.");
      //router.push("/reviews");
    }
  }, [isPending, formState.success]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <Heading className="text-2xl font-bold text-center">리뷰 작성</Heading>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
              <Input 
                name="slug"
                type="text"
                placeholder="슬러그를 입력해주세요"
                className={formState.errors?.slug ? "border-red-500" : ""}
              />
              {formState.errors?.slug && (
                <p className="text-sm text-red-500">{formState.errors.slug?.join(", ")}</p>
              )}
            </div>

            <div>
              <Input 
                name="title"
                type="text"
                placeholder="제목을 입력해주세요"
                className={formState.errors?.title ? "border-red-500" : ""}
              />
              {formState.errors?.title && (
                <p className="text-sm text-red-500">{formState.errors.title.join(", ")}</p>
              )}
            </div>


            <div>
              <Input 
                name="subtitle"
                type="text"
                placeholder="부제목을 입력해주세요"
                className={formState.errors?.subtitle ? "border-red-500" : ""}
              />
              {formState.errors?.subtitle && (
                <p className="text-sm text-red-500">{formState.errors.subtitle?.join(", ")}</p>
              )}
            </div>


            <div>
              <Input 
                type="file"
                name="image"
                className={formState.errors?.image ? "border-red-500" : ""}
              />
              {formState.errors?.image && (
                <p className="text-sm text-red-500">{formState.errors.image.join(", ")}</p>
              )}
            </div>

            <div>
              <Textarea placeholder="본문 (HTML 지원)" rows={10} 
                name="body"
                className={formState.errors?.body ? "border-red-500" : ""}
              />
              {formState.errors?.body && (
                <p className="text-sm text-red-500">{formState.errors.body.join(", ")}</p>
              )}
            </div>

            <Separator className="my-4" />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "등록 중..." : "리뷰 등록"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewNewPage;
