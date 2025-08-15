export default function FAQLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-16" />
      <div className="px-6 md:px-40 py-12 space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
