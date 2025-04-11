import React from 'react'
import { Heading } from '@/components/Heading'

export const metadata = {
  title: {
    default: "소개 | Indie Gamer",
    template: "%s | Indie Gamer",
    description: "최고의 인디 게임 리뷰를 전해드립니다.",
  }  
};

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Heading className="text-3xl font-bold text-center mb-6">Indie Gamer 소개</Heading>

      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        <strong>Indie Gamer</strong>는 전 세계의 독창적인 인디 게임들을 소개하고, 
        직접 플레이한 생생한 리뷰를 전달하는 커뮤니티 기반 플랫폼입니다.  
      </p>

      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        매주 업데이트되는 리뷰를 통해, 숨겨진 보석 같은 게임들을 발견하고,  
        새로운 게임 세계를 탐험해 보세요. 우리는 단순한 정보 전달을 넘어,  
        게이머들의 감정과 경험을 함께 나누고자 합니다.
      </p>

      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        커뮤니티와의 소통을 중요하게 생각하며, 여러분의 리뷰와 의견도 언제든 환영합니다.  
        <br />
        <span className="font-semibold">당신의 다음 최고의 게임, 여기서 시작됩니다.</span>
      </p>

      <div className="text-center mt-10">
        <p className="text-sm text-gray-500 dark:text-gray-400">문의: indie@gamer.com</p>
      </div>
    </div>
  )
}

export default AboutPage
