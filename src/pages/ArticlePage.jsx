"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleHeader from "../components/Article/ArticleHeader";
import MarkdownRenderer from "../components/Article/MarkdownRenderer";
import Sidebar from "../components/Article/Sidebar";
import TagsList from "../components/Article/TagsList";
import { Menu, X } from "lucide-react";
import { useActiveHeading } from "../hooks/useActiveHeading";
import "highlight.js/styles/github-dark.css";
import { fetchArticleById } from "../services/articleService";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { activeId, smoothScrollTo } = useActiveHeading();

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
    const list = Array.from(headingEls).map((el, index) => {
      let id = el.id?.trim();
      if (!id) {
        // generate a unique id based on index and text
        id = `${el.innerText
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")
          .slice(0, 30)}-${index}`;
        el.id = id; // attach to DOM element for linking
      }
      return {
        id,
        text: el.innerText,
        level: Number(el.tagName.replace("H", "")),
      };
    });

    setHeadings(list);
  }, [article?.markdown]);

  if (loading) return <div className="loader"></div>;

  const { title, markdown, tags, cover } = article || {};

  return (
    <div className="relative py-10 grid grid-cols-1 lg:grid-cols-[calc(100%-420px)_400px] gap-8 justify-between max-w-full mx-auto transition-all duration-500 ease-in-out">
      <aside className="hidden lg:block sticky lg:top-10 self-start transition-all duration-500 ease-in-out lg:order-3 order-0">
        <div className="overflow-hidden transition-all duration-500">
          <Sidebar
            headings={headings}
            activeId={activeId}
            smoothScrollTo={smoothScrollTo}
          />
        </div>
      </aside>

      <section className="prose break-words dark:prose-invert">
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
        <div className="divider mt-10" />
        <MarkdownRenderer markdown={markdown} />
      </section>

      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative max-w-[95%]">
            <Sidebar
              headings={headings}
              activeId={activeId}
              smoothScrollTo={smoothScrollTo}
            />
            <button
              onClick={() => setShowSidebar(false)}
              className="sidebar-close-btn absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowSidebar(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[rgb(69,69,69)] text-white rounded-full py-2 px-4"
      >
        <Menu size={20} />
        <span className="text-sm font-medium">Contents</span>
      </button>
    </div>
  );
}
