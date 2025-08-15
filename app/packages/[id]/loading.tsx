export default function PackageLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-16" />
      <div className="px-6 md:px-40 py-6 space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded" />

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 sm:col-span-2 sm:row-span-2 aspect-[16/11] bg-gray-200 rounded" />
          <div className="aspect-[6/4.1] bg-gray-200 rounded" />
          <div className="aspect-[6/4.1] bg-gray-200 rounded" />
          <div className="aspect-[6/4.1] bg-gray-200 rounded" />
          <div className="aspect-[6/4.1] bg-gray-200 rounded" />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
