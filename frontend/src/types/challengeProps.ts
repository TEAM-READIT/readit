interface ChallengeProps {
	articleId: number;
	title: string;
	content: string;
	problemList: problemListProps[];
	status?: number
}

interface answerList {
	problemNumber: number;
	optionNumber: number;
}

interface answers { 
		problemNumber: number;
		answerNumber: number;
		isCorrect:boolean;
}

interface answeranswer{
	answerList:answers[]
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
	challengeScore:number;
	rank:number
}

interface scoreRanking {
	memberList: memberRanking[];
	myRank: number;
}


export type { scoreRanking, problemListProps, answerList, optionListProps, ChallengeProps, answeranswer };