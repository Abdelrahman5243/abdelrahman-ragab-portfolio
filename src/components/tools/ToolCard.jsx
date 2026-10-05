import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import CommandLine from "./CommandLine";
import CardPreview from "./CardPreview";
import ToolLink from "./ToolLink";

const ToolCard = ({ tool, labels }) => {
  const [previewSet, setPreviewSet] = useState(0);
  const hasPreview = Boolean(tool.cardTitle);

  return (
    <article
      className="flex flex-col gap-3 h-full p-4 sm:p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary/90 dark:bg-dark-secondary/90 transition-colors duration-300 hover:border-light-blue/60 dark:hover:border-dark-blue/60"
      onPointerEnter={hasPreview ? () => setPreviewSet(1) : undefined}
      onPointerLeave={hasPreview ? () => setPreviewSet(0) : undefined}
    >
      <header className="flex items-baseline justify-between gap-3">
        <h4 className="text-base sm:text-lg font-semibold text-light-title dark:text-dark-title">
          {tool.name}
        </h4>
        {tool.meta && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-light-subtitle dark:text-dark-subtitle">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {tool.meta}
          </span>
        )}
      </header>

      <p className="text-sm leading-relaxed text-light-subtitle dark:text-dark-subtitle">
        {tool.description}
      </p>

      {tool.command && (
        <CommandLine command={tool.command} copyLabel={labels.copy} copiedLabel={labels.copied} />
      )}
      {hasPreview && <CardPreview title={tool.cardTitle} set={previewSet} />}

      <div className="flex-1" />

      <footer className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-light-subtitle dark:text-dark-subtitle">
          {tool.technologies.join(" · ")}
        </p>
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
      </footer>
    </article>
  );
};

export default ToolCard;
