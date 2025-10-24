import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function MarkdownRenderer({ markdown }) {
  const [copied, setCopied] = useState(false);

  const extractText = (children) => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(extractText).join("");
    if (typeof children === "object" && children?.props)
      return extractText(children.props.children);
    return "";
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeHighlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeText = extractText(children);

          return !inline && match ? (
            <div className="relative group">
              <CopyToClipboard text={codeText.trim()}>
                <button
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="absolute right-2 top-2 text-xs px-2 py-1 rounded bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
              <code className={className} {...props}>
                {children}
              </code>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
