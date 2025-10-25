export default function TagsList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 text-xs font-medium rounded-full border 
                             border-light-border dark:border-dark-border 
                             text-light-title dark:text-dark-title 
                             bg-light-secondary/60 dark:bg-dark-secondary/60
                             hover:bg-light-border/20 dark:hover:bg-dark-border/20 
                             transition-all duration-150"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
