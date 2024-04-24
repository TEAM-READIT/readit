interface communityProps {
	hits: number;
	writerName: String;
	maxParticipants: number;
	currentParticipants: number;
	articleCount: number;
	notice: String;
	categoryName: String;
	title: String;
	endAt: Date;
	memberList: memberProps[];
	articleList: articleProps[];
	chatList: chatProps[];
}

interface memberProps {
	memberId: number;
	memberName: String;
	profile: String;
	readCount: number;
}

interface articleProps {
	memberName: String;
	profile: String;
	articleId: number;
	title: String;
	content: String;
	categoryName: String;
	type: String;
	completedAt: Date;
	summary: String;
	score: number;
	feedback: String;
}

interface chatProps {
	memberId: number;
	memberName: String;
	memberProfile: String;
	sendDate: Date;
	content: String;
}

export type { communityProps, articleProps };