/** @type {import('next').NextConfig} */
const siteInfoTitle = 'qbreis — enric gatell';
const siteInfoDescription =
  'This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    siteInfoTitle: siteInfoTitle,
    siteInfoDescription: siteInfoDescription,
  },
};

module.exports = nextConfig;
