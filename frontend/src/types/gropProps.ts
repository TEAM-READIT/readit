interface communityProps {
	communityDetail: communityDetail
	memberList: memberProps[];
	articleList: articleProps[];
	chatList: chatProps[];
	myId: number;
	notice: string
}

interface communityDetail {
	communityId: number;
	hit: number;
	writerName: string;
	maxParticipants: number;
	currentParticipants: number;
	articleCount: number;
	myId?: number;
	notice: string;
	categoryName: string;
	title: string;
	endAt: Date;
}
interface memberProps {
	memberId: number;
	memberName: string;
	memberProfile: string;
	readCount: number;
}

interface articleProps {
	articleDetail: aricleDetail;
	member: memberProps
}

interface aricleDetail {
	articleId?: number;
	title: string;
	content: string;
	completedAt: Date;
	summary: string;
	score: number;
	feedback: string;
}
interface chatProps {
	memberId: number;
	memberName: string;
	memberProfile: string;
	createdAt: Date;
	content: string;
}

export type { communityProps, articleProps, aricleDetail };
