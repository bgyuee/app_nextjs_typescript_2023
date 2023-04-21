/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = 'app_nextjs_typescript_2023'

module.exports = {
  assetPrefix: !debug ? `${name}` : '',
  basePath: '/app_nextjs_typescript_2023',
}
