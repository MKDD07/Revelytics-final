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
        `SELECT slug, updated_at, created_at, date FROM rev_db
         WHERE slug IS NOT NULL AND slug != ''
         ORDER BY id DESC`
      ).all();
      results = queryRes?.results || [];

      // If rev_db had no records or fallback needed, also query blogs
      if (results.length === 0) {
        const blogsRes = await env.DB.prepare(
          `SELECT slug, updated_at, created_at FROM blogs
           WHERE is_published = 1 OR is_published IS NULL
           ORDER BY id DESC`
        ).all();
        results = blogsRes?.results || [];
      }
    } catch (err) {
      console.error("sitemap-blogs query error:", err);
    }
  }

  const urls = results
    .filter((post) => post && post.slug)
    .map((post) => {
      const lastmod = toDateString(post.updated_at || post.created_at || post.date);
      return `
<url>
  <loc>https://revelytics-final.mkmkataria07.workers.dev/blog/${post.slug}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.80</priority>
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
