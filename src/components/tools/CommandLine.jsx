import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { COPY_RESET_MS } from "./constants";

const CommandLine = ({ command, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), COPY_RESET_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const label = copied ? copiedLabel : copyLabel;

  return (
    <div
      dir="ltr"
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 font-mono text-xs sm:text-sm bg-zinc-950 text-zinc-100 border border-zinc-800"
    >
      <code className="truncate">
        <span className="text-emerald-400 select-none">$ </span>
        {command}
      </code>
      <CopyToClipboard text={command} onCopy={() => setCopied(true)}>
        <button
          type="button"
          className="flex-shrink-0 p-1 rounded text-zinc-400 hover:text-zinc-100 transition-colors"
          aria-label={label}
          title={label}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CommandLine;
