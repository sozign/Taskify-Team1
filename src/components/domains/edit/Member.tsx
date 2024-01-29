import { MembersData } from '@/constants/types';
import Image from 'next/image';
import React from 'react';
import Button from '../../common/Buttons/Button';

function Member({ memberData }: { memberData: MembersData }) {
	// 삭제 버튼 클릭하면 대시보드 멤버 구성원 삭제 요청
	return (
		<div className='flex h-[3.8rem] w-full items-center justify-between'>
			<div className='flex items-center gap-[1.2rem]'>
				<div className='flex h-[3.8rem] w-[3.8rem] rounded-full'>
					{memberData.profileImageUrl ? (
						<Image src={memberData.profileImageUrl} alt='프로필 이미지' width={38} height={38} />
					) : (
						<div className='flex w-full items-center justify-center rounded-full bg-green'>
							<span className='text-center text-16-600'>{memberData.nickname.slice(0, 1)}</span>
						</div>
					)}
				</div>
				<span className='text-16-400'>{memberData.nickname}</span>
			</div>
			<Button color='white' variant='delete-lg' className='cursor-pointer'>
				삭제
			</Button>
		</div>
	);
}

export default Member;
