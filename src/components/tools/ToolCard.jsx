import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import CommandLine from "./CommandLine";
import CardPreview from "./CardPreview";
import LoaderPreview from "./LoaderPreview";
import ToolLink from "./ToolLink";

// One full-width row: text on one side, a live demo of the tool on the other.
const ToolCard = ({ tool, labels, index }) => {
  const [previewSet, setPreviewSet] = useState(0);
  const hasCardPreview = Boolean(tool.cardTitle);
  const number = String(index + 1).padStart(2, "0");

  let demo = null;
  if (tool.command) {
    demo = (
      <div className="w-full">
        <CommandLine command={tool.command} copyLabel={labels.copy} copiedLabel={labels.copied} />
      </div>
    );
  } else if (hasCardPreview) {
    demo = (
      <div className="w-full">
        <CardPreview title={tool.cardTitle} set={previewSet} />
      </div>
    );
  } else if (tool.preview === "loaders") {
    demo = <LoaderPreview />;
  }

  return (
    <article
      className="group relative grid gap-5 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-8 md:items-center transition-colors duration-300 hover:bg-light-primary dark:hover:bg-dark-primary"
      onPointerEnter={hasCardPreview ? () => setPreviewSet(1) : undefined}
      onPointerLeave={hasCardPreview ? () => setPreviewSet(0) : undefined}
    >
      <span
        className="absolute inset-y-0 start-0 w-0.5 scale-y-0 bg-light-blue dark:bg-dark-blue transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />

      <div className="flex gap-4 sm:gap-5 min-w-0">
        <span
          dir="ltr"
          className="font-mono text-sm pt-1 text-light-subtitle dark:text-dark-subtitle transition-colors duration-300 group-hover:text-light-blue dark:group-hover:text-dark-blue"
          aria-hidden="true"
        >
          {number}
        </span>

        <div className="flex flex-col gap-3 min-w-0">
          <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-lg sm:text-xl font-semibold text-light-title dark:text-dark-title">
              {tool.name}
            </h3>
            {tool.meta && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {tool.meta}
              </span>
            )}
          </header>

          <p className="text-sm leading-relaxed text-light-subtitle dark:text-dark-subtitle">
            {tool.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <ul className="flex flex-wrap gap-1.5">
              {tool.technologies.map((tech) => (
                <li
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-xs border border-light-border dark:border-dark-border text-light-subtitle dark:text-dark-subtitle"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              {tool.repo && (
                <ToolLink href={tool.repo} label="GitHub" icon={Github} toolName={tool.name} />
              )}
              {tool.live && (
                <ToolLink
                  href={tool.live}
                  label={tool.liveLabel}
                  icon={ExternalLink}
                  toolName={tool.name}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {demo && (
        <div className="flex items-center justify-center min-h-[6rem] md:min-h-[8.5rem] p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary bg-[radial-gradient(circle,rgb(127_127_127/0.14)_1px,transparent_1px)] [background-size:14px_14px]">
          {demo}
        </div>
      )}
    </article>
  );
};

export default ToolCard;
