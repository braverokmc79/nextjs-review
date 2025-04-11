"use server";
import { console } from "node:inspector";
import { z } from "zod";
const formSchema = z.object({
  slug: z.string().min(1, "슬러그를 입력해주세요"),
  title: z.string().min(1, "제목을 입력해주세요"),
  subtitle: z.string().min(1, "부제목을 입력해주세요"),
  body: z.string().min(10, "본문은 최소 10자 이상이어야 합니다"),
  image: z.any(), // 파일이라 validation은 따로
});



export interface ReviewFormFormState{
    success: boolean;
    errors:{
       slug?: string[]; 
       title?: string[];
       subtitle?: string[];
       body?: string[];
       image?: string[];
       _form?:string[]; 
    }
}



export async function createReview(formState: ReviewFormFormState,formData: FormData): Promise<ReviewFormFormState > {
  console.log("👺0. 이미지 1");
  const rawData = {
    slug: formData.get("slug"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    body: formData.get("body"),
    image: formData.get("image"),
  };

  console.log("👺0. 이미지 2");

  const result = formSchema.safeParse(rawData);
  if (!result.success) {
    return  { 
      success: false,
      errors: result.error.flatten().fieldErrors }
  }

  const { slug,title, subtitle, body } = result.data;
  const imageFile = formData.get("image") as File;
  console.log("👺0. 이미지 업로드");

  try {
    // 1. 이미지 업로드
      
    console.log("👺1. 이미지 업로드");
    const imageForm = new FormData();
    imageForm.append("files", imageFile);
    
    console.log("👺👺👺업로드 전:");

    const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/upload`, {
      method: "POST",
      body: imageForm,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    console.log("📷11업로드 응답:", uploadRes);
    const uploadData = await uploadRes.json();
    console.log("📷22업로드 응답:", uploadData);
    
    const imageId = uploadData?.[0]?.id;

    if (!imageId) {
      throw new Error("이미지 업로드 실패");
    }

    // 2. 리뷰 등록
    const createRes = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // 보통 필요함
      },
      body: JSON.stringify({
        data: {
          slug,
          title,
          subtitle,
          body,
          image: imageId, // Strapi에서 관계 필드로 등록되어 있어야 함
        },
      }),
    });

    
    console.log("✅리뷰 등록 ", createRes);

    if (!createRes.ok) {
      throw new Error("리뷰 등록 실패");
    }


    return { 
      success: true, 
      errors: {}
     };
       
  } catch (err) {
    console.error("오류:", err);
    throw new Error("리뷰 등록 과정에서 오류가 발생했습니다.");
  }
}
