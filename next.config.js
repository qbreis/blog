/** @type {import('next').NextConfig} */
const siteInfoTitle = 'qbreis — enric gatell';
const siteInfoDescription = `This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.
  
Many of these annotations are related to their corresponding Git repository.`;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Adding policies:
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'self' 'https://blog-qbreis.vercel.app/'; image-src 'https://blog-qbreis.vercel.app/'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Permissions-Policy',
              value: "camera=(); battery=(self); geolocation=();",
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },
  
  env: {
    siteInfoTitle: siteInfoTitle,
    siteInfoDescription: siteInfoDescription,
    paginationLimit: 3,
  },
};

module.exports = nextConfig;
