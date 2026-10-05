import { external_link_click } from "../../analytics";

const ToolLink = ({ href, label, icon: Icon, toolName }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-light-border/80 dark:border-dark-border bg-light-primary/60 dark:bg-dark-primary/60 text-light-subtitle dark:text-dark-subtitle hover:border-light-blue/50 dark:hover:border-dark-blue/50 hover:text-light-blue dark:hover:text-dark-blue transition-colors duration-200"
    onClick={() =>
      external_link_click({ url: href, label: `${toolName} ${label}`, location: "tools_strip" })
    }
  >
    <Icon size={13} aria-hidden="true" />
    {label}
  </a>
);

export default ToolLink;
