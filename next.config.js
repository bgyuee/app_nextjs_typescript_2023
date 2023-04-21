/** @type {import('next').NextConfig} */
// next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = 'app_nextjs_typescript_2023'
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `${name}` : '',
  basePath: '/app_nextjs_typescript_2023',
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성
}

module.exports = nextConfig

