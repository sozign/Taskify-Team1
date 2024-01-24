export interface UserInfo {
	accessToken: string;
	user: {
		id: number;
		email: string;
		nickname: string;
		profileImageUrl: null | string;
		createdAt: string;
		updatedAt: string;
	};
}

export interface CardItemPost {
	assigneeUserId: number;
	dashboardId: number;
	columnId: number;
	title: string;
	description: string;
	dueDate: string;
	tags: string[];
	imageUrl: string;
}

export interface CardItemGet {
	id: number;
	title: string;
	description: string;
	tags: string[];
	dueDate: string;
	assignee: {
		profileImageUrl: string;
		nickname: string;
		id: number;
	};
	imageUrl: string;
	teamId: string;
	columnId: number;
	createdAt: string;
	updatedAt: string;
}

export interface CardList {
	cursorId: number;
	totalCount: number;
	cards: CardItemGet[];
}
