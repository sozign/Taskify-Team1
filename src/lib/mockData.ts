//현진) dropdownmanager mockmockdata
interface Member {
	id: number;
	userId: number;
	email: string;
	nickname: string;
	profileImageUrl: string | null;
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
				profileImageUrl: 'https://i.pinimg.com/564x/a2/d7/57/a2d7571e90f07a7221623ab20e064977.jpg',
				createdAt: '2024-01-25T12:42:44.200Z',
				updatedAt: '2024-01-25T12:42:44.200Z',
				isOwner: true,
			},
			{
				id: 2,
				userId: 2,
				email: 'c@naver.com',
				nickname: '박운성',
				profileImageUrl: 'https://i.pinimg.com/564x/f0/82/3c/f0823c54bb92aec76f2959d88a0c42a5.jpg',
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
