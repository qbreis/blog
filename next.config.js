/** @type {import('next').NextConfig} */
const siteInfoTitle = 'qbreis — enric gatell';
const siteInfoDescription = `This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.
  
Many of these annotations are related to their corresponding Git repository.`;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Adding policies:
  /*
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
                "img-src data: w3.org/svg/2000;",
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
  */
  env: {
    siteInfoTitle: siteInfoTitle,
    siteInfoDescription: siteInfoDescription,
    paginationLimit: 9,
  },
};

module.exports = nextConfig;
