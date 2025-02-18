export const BlogSkeleton = () => {
    return (
        <div>
            {/* Blog Skeleton */}
            <div className="animate-pulse max-w-screen-xl mx-auto p-5">
                {/* Title */}
                <div className="h-10 bg-gray-300 rounded w-3/4 mb-3"></div>

                {/* Date */}
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-5"></div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                </div>

                {/* Author */}
                <div className="mt-8 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="ml-3">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32 mt-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
