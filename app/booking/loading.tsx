export default function BookingLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-16" />
      <div className="h-[60vh] bg-gray-200" />
      <div className="px-6 md:px-40 py-12 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-[600px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}
