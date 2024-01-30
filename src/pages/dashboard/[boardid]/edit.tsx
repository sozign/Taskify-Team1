import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import EditBox from '@/components/domains/edit/EditBox';
import arrowForward from '@/../Public/assets/arrowForward.svg';
import PageLayout from '@/components/common/PageLayout';
import MemberBox from '@/components/domains/edit/MemberBox';
import { InvitationsDashboardGet, MembersGet, UserInfo } from '@/constants/types';
import InviteListBox from '@/components/domains/edit/InviteListBox';

const myInfo: UserInfo = {
	id: 1,
	email: 'asd@aa.cc',
	nickname: 'asd',
	profileImageUrl: null,
	createdAt: '2024-01-28T00:35:34.671Z',
	updatedAt: '2024-01-28T00:35:34.671Z',
};

const members: MembersGet = {
	totalCount: 5,
	members: [
		{
			id: 1,
			userId: 11,
			email: 'asd@aa.cc',
			nickname: 'asd',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: true,
		},
		{
			id: 2,
			userId: 12,
			email: 'fgh@aa.cc',
			nickname: 'fgh',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: false,
		},
		{
			id: 3,
			userId: 13,
			email: 'jkl@aa.cc',
			nickname: 'jkl',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: false,
		},
		{
			id: 4,
			userId: 14,
			email: 'zxc@aa.cc',
			nickname: 'zxc',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: false,
		},
		{
			id: 5,
			userId: 15,
			email: 'vbn@aa.cc',
			nickname: 'vbn',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: false,
		},
		{
			id: 6,
			userId: 16,
			email: 'qwe@aa.cc',
			nickname: 'qwe',
			profileImageUrl: null,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
			isOwner: false,
		},
	],
};

const invitations: InvitationsDashboardGet = {
	totalCount: 5,
	invitations: [
		{
			id: 21,
			inviter: {
				nickname: 'asd',
				email: 'asd@aa.cc',
				id: 11,
			},
			teamId: '31',
			dashboard: {
				title: '비브리지',
				id: 41,
			},
			invitee: {
				nickname: 'fgh',
				email: 'fgh@aa.cc',
				id: 12,
			},
			inviteAccepted: true,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
		},
		{
			id: 22,
			inviter: {
				nickname: 'asd',
				email: 'asd@aa.cc',
				id: 11,
			},
			teamId: '31',
			dashboard: {
				title: '비브리지',
				id: 41,
			},
			invitee: {
				nickname: 'jkl',
				email: 'jkl@aa.cc',
				id: 13,
			},
			inviteAccepted: true,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
		},
		{
			id: 23,
			inviter: {
				nickname: 'asd',
				email: 'asd@aa.cc',
				id: 11,
			},
			teamId: '31',
			dashboard: {
				title: '비브리지',
				id: 41,
			},
			invitee: {
				nickname: 'zxc',
				email: 'zxc@aa.cc',
				id: 14,
			},
			inviteAccepted: true,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
		},
		{
			id: 24,
			inviter: {
				nickname: 'asd',
				email: 'asd@aa.cc',
				id: 11,
			},
			teamId: '31',
			dashboard: {
				title: '비브리지',
				id: 41,
			},
			invitee: {
				nickname: 'qwe',
				email: 'vbn@aa.cc',
				id: 15,
			},
			inviteAccepted: true,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
		},
		{
			id: 25,
			inviter: {
				nickname: 'asd',
				email: 'asd@aa.cc',
				id: 11,
			},
			teamId: '31',
			dashboard: {
				title: '비브리지',
				id: 41,
			},
			invitee: {
				nickname: 'qwe',
				email: 'qwe@aa.cc',
				id: 16,
			},
			inviteAccepted: true,
			createdAt: '2024-01-28T00:35:34.671Z',
			updatedAt: '2024-01-28T00:35:34.671Z',
		},
	],
};

export default function DashBoardEdit() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	const title = '비브리지';
	const color = 'green';

	return (
		<PageLayout boardId={boardId}>
			<div className='flex h-fit w-full flex-col gap-[2rem] bg-gray-F pb-[5.6rem] md:pb-[4.8rem] sm:gap-[1.7rem] sm:pb-[2.4rem]'>
				<MyDashboardHeader title={'비브리지'} nickname={'nickname'} profileImageUrl={''} />
				<Link
					href={`/dashboard/${boardId}`}
					className='ml-[2rem] flex h-fit w-fit items-center justify-center gap-[0.6rem]'
				>
					<Image src={arrowForward} alt='돌아가기 버튼' className='sm:h-[1.8rem] sm:w-[1.8rem]' />
					<span className='text-16-500 text-black-3 sm:text-14-500'>돌아가기</span>
				</Link>
				<div className='flex flex-col gap-[1.2rem] sm:gap-[1.1rem]'>
					<EditBox title={title} color={color} />
					<MemberBox members={members} />
					<InviteListBox invitations={invitations} />
				</div>
				<button className='ml-[2rem] mt-[2rem] flex h-[6.2rem] w-fit flex-shrink-0 items-center justify-center rounded-[0.8rem] border border-gray-D bg-gray-F px-[9.5rem] py-[2rem] text-center text-18-500 text-black-3 md:mt-[2.8rem] sm:mx-[1.2rem] sm:mt-[1.5rem] sm:text-16-500'>
					대시보드 삭제하기
				</button>
			</div>
		</PageLayout>
	);
}
