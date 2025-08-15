export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-16" />
      <div className="space-y-6">
        <div className="h-[60vh] bg-gray-200" />
        <div className="container mx-auto px-6 md:px-12 space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
