import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "인디 게이머",
  description: "인디 게이머을 이용한 넥스트",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="w-full flex flex-col min-h-screen items-center bg-gray-50 text-gray-900">
        {/* 헤더 */}
        <header className="w-full max-w-screen-2xl px-6 py-4">
          <NavBar />
        </header>

        {/* 메인 콘텐츠 (남은 공간을 모두 차지) */}
        <main className="w-full max-w-screen-2xl flex-grow px-6 py-6">
          {children}
        </main>

        {/* 푸터 (항상 바닥에 유지) */}
        <footer className="w-full max-w-screen-2xl border-t border-gray-300 py-4 text-center text-gray-600 text-sm">
          게임 데이터 및 이미지는{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            RAWG
          </a>{" "}
          에서 제공됩니다.
        </footer>
      </body>
    </html>
  );
}

