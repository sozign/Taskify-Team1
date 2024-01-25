//현진) dropdownmanager mockmockdata
interface Member {
	id: number;
	userId: number;
	email: string;
	nickname: string;
	profileImageUrl: null;
	createdAt: string;
	updatedAt: string;
	isOwner: boolean;
}

interface MockData {
	members: Member[];
	totalCount: number;
}
const mockData = [
	{
		members: [
			{
				id: 0,
				userId: 0,
				email: 'a@naver.com',
				nickname: '한지수',
				profileImageUrl: null,
				createdAt: '2024-01-25T12:42:44.200Z',
				updatedAt: '2024-01-25T12:42:44.200Z',
				isOwner: true,
			},
			{
				id: 1,
				userId: 1,
				email: 'b@naver.com',
				nickname: '정현진',
				profileImageUrl: 'string',
				createdAt: '2024-01-25T12:42:44.200Z',
				updatedAt: '2024-01-25T12:42:44.200Z',
				isOwner: true,
			},
			{
				id: 2,
				userId: 2,
				email: 'c@naver.com',
				nickname: '박운성',
				profileImageUrl: null,
				createdAt: '2024-01-25T12:42:44.200Z',
				updatedAt: '2024-01-25T12:42:44.200Z',
				isOwner: true,
			},
		],
		totalCount: 0,
	},
];

export const getMockData = (): Promise<{ data: MockData[] }> => {
	return Promise.resolve({ data: mockData });
};
