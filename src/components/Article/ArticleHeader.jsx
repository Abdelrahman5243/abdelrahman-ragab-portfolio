
export default function ArticleHeader({ title }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-light-title dark:text-dark-title">
        {title}
      </h1>
    </div>
  );
}
