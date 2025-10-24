"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleHeader from "../components/Article/ArticleHeader";
import MarkdownRenderer from "../components/Article/MarkdownRenderer";
import Sidebar from "../components/Article/Sidebar";
import TagsList from "../components/Article/TagsList";
import "highlight.js/styles/github-dark.css";
import { fetchArticleById } from "../services/articleService";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const articleData = await fetchArticleById(id);

        if (!articleData) {
          navigate("/", { replace: true });
          return;
        }

        setArticle(articleData);
      } catch (err) {
        console.error("Error fetching article:", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) loadArticle();
  }, [id, navigate]);

  useEffect(() => {
    if (!article?.markdown) return;
    const headingEls = document.querySelectorAll("h1, h2, h3");
    const list = Array.from(headingEls).map((el) => ({
      id: el.id,
      text: el.innerText,
      level: Number(el.tagName.replace("H", "")),
    }));
    setHeadings(list);
  }, [article?.markdown]);

  if (loading) return <div className="loader"></div>;

  const { title, markdown, tags, cover } = article || {};

  return (
    <div className="relative px-4 py-10 grid grid-cols-1 lg:grid-cols-[calc(100%-392px)_330px] gap-8 justify-between max-w-full mx-auto transition-all duration-500 ease-in-out">
      <aside className="lg:block sticky lg:top-10 self-start transition-all duration-500 ease-in-out lg:order-3 order-0">
        <div className="overflow-hidden transition-all duration-500">
          <Sidebar headings={headings} />
        </div>
      </aside>

      <section className="prose dark:prose-invert transition-all duration-500 lg:order-2 order-1">
        {cover && (
          <div className="w-full overflow-hidden rounded-md mb-8">
            <img
              src={cover}
              alt={title}
              className="w-full max-h-60 object-cover rounded-lg"
            />
          </div>
        )}
        <ArticleHeader title={title} />
        {tags && <TagsList tags={tags} />}
        <MarkdownRenderer markdown={markdown} />
      </section>
    </div>
  );
}
