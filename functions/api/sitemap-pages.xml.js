export async function onRequest() {
  const staticUrls = [
    { loc: "https://revelytics-final.mkmkataria07.workers.dev/", priority: "1.0", changefreq: "daily" },
    { loc: "https://revelytics-final.mkmkataria07.workers.dev/services", priority: "0.95", changefreq: "daily" },
    { loc: "https://revelytics-final.mkmkataria07.workers.dev/blog", priority: "0.90", changefreq: "daily" },
    { loc: "https://revelytics-final.mkmkataria07.workers.dev/faq", priority: "0.80", changefreq: "monthly" },
    { loc: "https://revelytics-final.mkmkataria07.workers.dev/contact", priority: "0.80", changefreq: "monthly" },
  ];

  const today = new Date().toISOString().split("T")[0];

  const urls = staticUrls
    .map(
      (page) => `
<url>
  <loc>${page.loc}</loc>
  <lastmod>${today}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
