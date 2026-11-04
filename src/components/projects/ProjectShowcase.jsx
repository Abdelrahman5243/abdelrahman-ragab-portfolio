import { ArrowRight, FileCode2, Folder } from "lucide-react";

const Panel = ({ title, children, className = "" }) => (
  <figure
    className={`flex flex-col min-w-0 rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary overflow-hidden ${className}`}
  >
    <figcaption className="px-5 py-3 text-sm font-semibold border-b border-light-border dark:border-dark-border text-light-title dark:text-dark-title">
      {title}
    </figcaption>
    {children}
  </figure>
);

const CodeBlock = ({ body }) => (
  <pre
    dir="ltr"
    className="flex-1 m-0 p-5 overflow-x-auto text-[0.8rem] sm:text-sm leading-6 font-mono text-start bg-zinc-950 text-zinc-100"
  >
    <code>{body}</code>
  </pre>
);

// A file-explorer style tree. Each row is { name, depth, note }; names ending
// in "/" are folders.
const FolderTree = ({ items }) => (
  <ul className="flex flex-col p-3 sm:p-4">
    {items.map((item, i) => {
      const isFolder = item.name.endsWith("/");
      const Icon = isFolder ? Folder : FileCode2;
      return (
        <li
          key={i}
          className="flex flex-wrap items-center gap-x-3 gap-y-0.5 rounded-lg py-1.5 pe-2 hover:bg-light-primary dark:hover:bg-dark-primary"
          style={{ paddingInlineStart: `${0.5 + item.depth * 1.5}rem` }}
        >
          <span dir="ltr" className="inline-flex items-center gap-2 font-mono text-sm">
            <Icon
              size={16}
              className={
                isFolder
                  ? "text-light-blue dark:text-dark-blue"
                  : "text-light-subtitle dark:text-dark-subtitle"
              }
              aria-hidden="true"
            />
            <span
              className={
                isFolder
                  ? "font-semibold text-light-title dark:text-dark-title"
                  : "text-light-title dark:text-dark-title"
              }
            >
              {item.name.replace(/\/$/, "")}
            </span>
          </span>
          {item.note && (
            <span className="text-sm text-light-subtitle dark:text-dark-subtitle">{item.note}</span>
          )}
        </li>
      );
    })}
  </ul>
);

const ProjectShowcase = ({ showcase }) => {
  if (!showcase) return null;
  const { code, generates, tree } = showcase;

  return (
    <div className="mx-0 sm:mx-2 mb-6 grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {code && (
        <Panel title={code.title}>
          <CodeBlock body={code.body} />
        </Panel>
      )}

      {generates && (
        <Panel title={generates.title}>
          <ol className="flex flex-col gap-3 p-5">
            {generates.items.map((item) => (
              <li key={item.name}>
                <div className="flex items-start gap-3 rounded-xl p-3.5 border border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary">
                  <ArrowRight
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-light-blue dark:text-dark-blue rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-semibold text-light-title dark:text-dark-title">
                      {item.name}
                    </span>
                    <span className="text-sm leading-6 text-light-subtitle dark:text-dark-subtitle">
                      {item.text}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      )}

      {tree && (
        <Panel title={tree.title} className="md:col-span-2">
          <FolderTree items={tree.items} />
        </Panel>
      )}
    </div>
  );
};

export default ProjectShowcase;
