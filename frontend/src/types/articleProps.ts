interface articleList {
	id?: number;
	title: string;
	content: string;
	type: string;
	categoryName?: string;
	hit?: number;
	reporter?: string;
	completedAt?: Date;
	modifiedAt?: Date;
	memoList?: memo[];
	score?: number;
	summary?: string;
	memberArticleId?: number
	communityId?: number
}

interface PopArticleList {
	articleList: articleList[];
	epigraphyList: articleList[];
	newsList: articleList[];
}

interface memo {
	startIndex: number;
	endIndex: number;
	color: string;
	content: string;
}

export type { articleList, PopArticleList };
