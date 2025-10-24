
export default function ArticleHeader({ title }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h1>
    </div>
  );
}
