/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://your-survey.xyz', // 실제 도메인으로 바꾸세요
  generateRobotsTxt: true,            // robots.txt 자동 생성
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
};
