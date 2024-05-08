interface communityList {
	communityId: number;
	hit: number;
	writerName?: string;
	maxParticipants?: number;
	currentParticipants?: number;
	categoryName: string;
	title: string;
	content: string;
	startAt?: Date;
	endAt?: Date;
}


export default communityList