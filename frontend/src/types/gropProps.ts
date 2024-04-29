interface communityProps {
	communityId: number;
	hit: number;
	writerName: string;
	maxParticipants: number;
	currentParticipants: number;
	articleCount: number;
	notice: string;
	categoryName: string;
	title: string;
	endAt: Date;
	memberList: memberProps[];
	articleList: articleProps[];
	chatList: chatProps[];
}

interface memberProps {
	memberId: number;
	memberName: string;
	profile: string;
	readCount: number;
}

interface articleProps {
	memberName: string;
	profile: string;
	articleId: number;
	title: string;
	content: string;
	categoryName: string;
	type: string;
	completedAt: Date;
	summary: string;
	score: number;
	feedback: string;
}

interface chatProps {
	memberId: number;
	memberName: string;
	memberProfile: string;
	sendDate: Date;
	content: string;
}

export type { communityProps, articleProps };
