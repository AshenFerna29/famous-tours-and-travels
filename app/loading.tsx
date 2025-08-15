export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-[#fda720] border-t-transparent rounded-full animate-spin" aria-hidden />
        <p className="text-sm text-[#353978]">Loading…</p>
      </div>
    </div>
  );
}
