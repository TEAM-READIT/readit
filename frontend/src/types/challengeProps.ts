interface ChallengeProps {
	articleId: number;
	content: string;
	problemList: problemListProps[];
}

interface answerList {
	problemNumber: number;
	answerNumber: number;
}

interface problemListProps {
	problemNumber: number;
	problem: string;
	optionList: optionListProps[];
}

interface optionListProps {
	optionNumber: number;
	option: string;
}

interface memberRanking {
	name: string;
	profile: string;
}

interface scoreRanking {
	memberList: memberRanking[];
	myRank: number;
}


export type { scoreRanking, problemListProps, answerList, optionListProps, ChallengeProps };