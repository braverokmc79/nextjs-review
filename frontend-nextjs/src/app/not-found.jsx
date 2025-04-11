import React from 'react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFoundPage
