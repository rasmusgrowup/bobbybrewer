/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
}

module.exports = nextConfig

const withTM = require('next-transpile-modules')(['@mui/x-charts']); // pass the modules you would like to see transpiled

module.exports = withTM({});