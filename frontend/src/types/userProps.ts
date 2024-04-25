interface userProps {
	email: string;
	setEmail: (email:string) => void;
	id: number;
	setId: (id:number) => void;
	name: string;
	setName: (name:string) => void;
	profileImageUrl: string;
	setProfileImageUrl: (profileImageUrl:string) => void;
}

export default userProps;