interface CommunityList {
	communityId?: number;
	hits: number;
	writerName?: string;
	writerProfile?: string;
	maxParticipants?: number;
	currentParticipants?: number;
	categoryName: string;
	title: string;
	content: string;
	articleCount: number;
	startAt?: Date;
	endAt?: Date;
}

export default CommunityList;
