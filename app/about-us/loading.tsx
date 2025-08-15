export default function AboutLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-16" />
      <div className="px-6 md:px-40 py-12 space-y-6">
        <div className="h-8 w-56 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
