export async function onRequest() {
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
  <loc>https://revelytics-final.mkmkataria07.workers.dev/sitemap-pages.xml</loc>
  <lastmod>${today}</lastmod>
</sitemap>
<sitemap>
  <loc>https://revelytics-final.mkmkataria07.workers.dev/sitemap-services.xml</loc>
  <lastmod>${today}</lastmod>
</sitemap>
<sitemap>
  <loc>https://revelytics-final.mkmkataria07.workers.dev/sitemap-blogs.xml</loc>
  <lastmod>${today}</lastmod>
</sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
