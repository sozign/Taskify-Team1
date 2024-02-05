export interface UserInfo {
	id: number;
	email: string;
	nickname: string;
	profileImageUrl: null | string;
	createdAt: string;
	updatedAt: string;
}

export interface UserInfoWithToken {
	accessToken: string;
	user: UserInfo;
}

export interface CardItemPost {
	assigneeUserId?: number;
	dashboardId: number;
	columnId: number;
	title: string;
	description: string;
	dueDate?: string;
	tags: string[];
	imageUrl?: string;
}

export interface CardData {
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

export interface CardItemGet {
	cursorId: number;
	totalCount: number;
	cards: CardData[];
}

export interface ColumnPost {
	title: string;
	dashboardId: number;
}

export interface ColumnData {
	id: number;
	title: string;
	teamId: string;
	createdAt: string;
	updatedAt: string;
}

export interface ColumnGet {
	result: string;
	data: ColumnData[];
}

export interface ColumnPut {
	title: string;
}

export interface ImagePost {
	image: string;
}

export interface CardImageGet {
	imageUrl: string;
}

export interface CommentPost {
	content: string;
	cardId: number;
	columnId: number;
	dashboardId: number;
}

export interface CommentData {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	cardId: number;
	author: {
		profileImageUrl: string;
		nickname: string;
		id: number;
	};
}

export interface CommentsGet {
	cursorId: number;
	comments: CommentData[];
}

export interface CommentPut {
	content: string;
}

export interface DashboardPost {
	title: string;
	color: string;
}

export interface DashboardData {
	id: number;
	title: string;
	color: '#7AC555' | '#760DDE' | '#FFA500' | '#76A6EA' | '#E876EA';
	createdAt: string;
	updatedAt: string;
	createdByMe: boolean;
	userId: number;
}

export interface DashboardsGet {
	cursorId: number;
	totalCount: string;
	dashboards: DashboardData[];
}

export interface InvitationDashboardPost {
	email: string;
}

export interface InvitationDashboardData {
	id: number;
	inviter: {
		nickname: string;
		email: string;
		id: number;
	};
	teamId: string;
	dashboard: {
		title: string;
		id: number;
	};
	invitee: {
		nickname: string;
		email: string;
		id: number;
	};
	inviteAccepted: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface InvitationsDashboardGet {
	totalCount: number;
	invitations: InvitationDashboardData[];
}

export interface InvitationsGet {
	cursorId: number;
	invitations: InvitationDashboardData[];
}

export interface InvitationPut {
	inviteAccepted: boolean;
}

export interface MembersData {
	id: number;
	userId: number;
	email: string;
	nickname: string;
	profileImageUrl: null | string;
	createdAt: string;
	updatedAt: string;
	isOwner: boolean;
}

export interface MembersGet {
	members: MembersData[];
	totalCount: number;
}

export interface UsersProfileImagePost {
	profileImageUrl: string;
}
