const ARTICLES_REPO_URL = import.meta.env.VITE_ARTICLES_REPO_URL;

export async function fetchAllArticles() {
  const res = await fetch(`${ARTICLES_REPO_URL}/index.json`);
  if (!res.ok) throw new Error("Failed to fetch articles index");
  return res.json();
}

export async function fetchArticleById(id) {
  const articles = await fetchAllArticles();
  const meta = articles.find((a) => a._id === Number(id));
  if (!meta) return null;

  const res = await fetch(`${ARTICLES_REPO_URL}/${meta.slug}.md`);
  if (!res.ok) throw new Error("Failed to fetch article content");
  const markdown = await res.text();

  return { ...meta, markdown };
}
