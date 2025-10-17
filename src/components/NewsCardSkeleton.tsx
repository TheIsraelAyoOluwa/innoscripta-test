export const NewsCardSkeleton = () => {
  return (
    <div className="w-[350px] h-[300px] border rounded-xl shadow-sm animate-pulse bg-white">
      <div className="h-[200px] bg-gray-200 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
};