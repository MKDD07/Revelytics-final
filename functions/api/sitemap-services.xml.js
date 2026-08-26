export async function onRequest(context) {
  const { env } = context;
  const today = new Date().toISOString().split("T")[0];

  const toDateString = (val) => {
    if (!val) return today;
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return today;
      return d.toISOString().split("T")[0];
    } catch {
      return today;
    }
  };

  let results = [];
  if (env?.DB) {
    try {
      const queryRes = await env.DB.prepare(
        `SELECT service_slug, updated_at, created_at FROM services
         WHERE is_active = 1 OR is_active IS NULL
         ORDER BY sort_order ASC, id ASC`
      ).all();
      results = queryRes?.results || [];
    } catch (err) {
      console.error("sitemap-services query error:", err);
    }
  }

  const urls = results
    .filter((svc) => svc && (svc.service_slug || svc.slug))
    .map((svc) => {
      const slug = svc.service_slug || svc.slug;
      const lastmod = toDateString(svc.updated_at || svc.created_at);
      return `
<url>
  <loc>https://revelytics-final.mkmkataria07.workers.dev/services/${slug}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.85</priority>
</url>`;
    })
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
