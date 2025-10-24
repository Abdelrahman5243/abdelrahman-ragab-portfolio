const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAllArticles() {
  const res = await fetch(`${API_BASE_URL}/articles`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  const data = await res.json();
  return data.articles || [];
}

export async function fetchArticleById(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  const data = await res.json();
  return data.article || null;
}
