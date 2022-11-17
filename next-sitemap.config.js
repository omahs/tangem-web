/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tangem.com',
  changefreq: 'weekly',
  priority: 1.0,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'build',
  exclude: ['/resellers', '*/resellers', '/lobstr'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/en','/*?'],
      },
      {
        userAgent: '*',
        allow: ['/*.css', '/*.js', '/*.jpg', '/*.avif', '/*.webp', '/*.png', '/*.gi', '/*.svg'],
        disallow: '/*?'
      },
    ],
  }
}
