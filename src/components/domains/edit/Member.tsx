import { MembersData } from '@/constants/types';
import Image from 'next/image';
import Button from '../../common/Buttons/Button';
import { deleteMembers } from '@/lib/api';
import Crown from '@/../../public/assets/royalCrownIcon.svg';

interface MemberProps {
	memberData: MembersData;
	hostId: number;
}

function Member({ hostId, memberData }: MemberProps) {
	async function handleDeleteMember(memberId: number) {
		const resStatus = await deleteMembers(memberId);
		console.log(resStatus);
	}

	return (
		<div className='flex h-[3.8rem] w-full items-center justify-between sm:h-[3.4rem]'>
			<div className='flex items-center gap-[1.2rem] sm:gap-[0.8rem]'>
				<div className='flex h-[3.8rem] w-[3.8rem] rounded-full sm:h-[3.4rem] sm:w-[3.4rem]'>
					{memberData.profileImageUrl ? (
						<Image src={memberData.profileImageUrl} alt='프로필 이미지' width={38} height={38} />
					) : (
						<div className='flex w-full items-center justify-center rounded-full bg-green'>
							<span className='sm:text-14-600 text-center text-16-600'>{memberData.nickname.slice(0, 1)}</span>
						</div>
					)}
				</div>
				<span className='text-16-400 sm:text-14-400'>{memberData.nickname}</span>
			</div>
			{hostId === memberData.userId ? (
				<div className='flex w-[8.4rem] justify-center'>
					<Image src={Crown} alt='대시보드 주인 왕관' height={32} />
				</div>
			) : (
				<Button
					onClick={() => handleDeleteMember(memberData.id)}
					disabled={false}
					color='white'
					variant='delete-lg'
					className='sm:w-[5.2rem] sm:text-12-500'
				>
					삭제
				</Button>
			)}
		</div>
	);
}

export default Member;
