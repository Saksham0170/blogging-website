export const BlogsSkeleton = () => {
    return (
        <div className='max-w-3xl mx-auto p-4'>
            {/* AppBar Skeleton */}


            {/* Blog List Skeleton */}
            <div className="mt-6 space-y-6">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        {/* Author & Date */}
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </div>

                        {/* Title */}
                        <div className="h-6 bg-gray-300 rounded w-2/3 mt-2"></div>

                        {/* Content Preview */}
                        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6 mt-1"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mt-1"></div>

                        {/* Read Time */}
                        <div className="h-4 bg-gray-300 rounded w-24 mt-2"></div>

                        {/* Divider */}
                        <div className="border-b border-gray-200 mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
