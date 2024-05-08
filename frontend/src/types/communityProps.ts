export interface CommunityList {
	communityId: number;
	hits: number;
	writerName?: string;
	maxParticipants?: number;
	currentParticipants?: number;
	categoryName: string;
	title: string;
	content: string;
	startAt?: Date;
	endAt?: Date;
}


export type CommunityListArray = CommunityList[];