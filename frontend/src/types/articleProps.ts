interface articleList {
	articleId: number;
	title: string;
	content: string;
	type: string;
	categoryName?: string;
	hits: number;
	reporter?: string;
	completedAt?: Date;
	modifiedAt?: Date;
	memoList?:memo[]
}

interface PopArticleList {
	all: articleList[];
	news: articleList[];
	epigraphy: articleList[];
}

interface memo {
	startIndex: number;
	endIndex: number;
	color:string;
	content:string;
}

export type { articleList, PopArticleList };
