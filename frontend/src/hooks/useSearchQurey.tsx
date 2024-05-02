import { useInfiniteQuery } from "react-query";

const {
	fetchNextPage,
	fetchPreviousPage,
	hasNextPage,
	hasPreviousPage,
	isFetchingNextPage,
	isFetchingPreviousPage,
	...result
} = useInfiniteQuery({
	queryKey,
	queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
	...options,
	getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
	getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
});
