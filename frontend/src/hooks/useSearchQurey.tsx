import { useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { articleList } from '../types/articleProps'; 

interface UseSearchArticleQueryProps {
	queryFn: (context?: QueryFunctionContext) => Promise<articleList[]>;
	rowsPerPage: number;
}

const queryKey = 'searchArticles';

const useSearchArticleQuery = ({ queryFn, rowsPerPage }: UseSearchArticleQueryProps) => {
  	const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<articleList[]>(
		queryKey,
		queryFn,
		{
			getNextPageParam: (allPages) => {
				const nextPage = allPages.length + 1;
				return rowsPerPage * nextPage;
			},
			retry: 0,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	);

	const articles = useMemo(() => {
		return data?.pages.flatMap((page) => page) ?? [];
	}, [data]);

	return { articles, isLoading, isError, fetchNextPage, isFetchingNextPage };
};

export default useSearchArticleQuery;