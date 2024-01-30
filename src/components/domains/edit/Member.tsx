import { MembersData } from '@/constants/types';
import Image from 'next/image';
import React from 'react';
import Button from '../../common/Buttons/Button';

function Member({ memberData }: { memberData: MembersData }) {
	// 삭제 버튼 클릭하면 대시보드 멤버 구성원 삭제 요청
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
			<Button color='white' variant='delete-lg' className='cursor-pointer sm:w-[5.2rem] sm:text-12-500'>
				삭제
			</Button>
		</div>
	);
}

export default Member;
