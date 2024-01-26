import Link from 'next/link';
import Image from 'next/image';
import PlusIcon from '@/../../Public/assets/PlusIcon.svg';
import SettingIcon from '@/../../Public/assets/settingIcon.svg';
import Vector from '@/../../Public/assets/Vector.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import { useState } from 'react';
import AdditionModal from '@/components/modal/AdditionModal';

interface userDataProps {
	id: number;
	title: string;
	nickname: string;
	profileImageUrl: string;
}

export default function DashboardHeader({ id, title, nickname, profileImageUrl }: userDataProps) {
	const [open, setOpen] = useState(false);
	const dashBoardIdEditUrl = `/dashboard/${id}/edit`;

	const additionHandleClick = () => {
		setOpen((prev) => !prev);
	};

	return (
		<header className='container m-3 border-b-[0.1rem] bg-white pb-3 pl-[20.2%] '>
			<div className='flex items-center justify-between'>
				<Link href='/mydashboard'>
					<div className='flex items-center justify-center gap-2 text-18-700 md:hidden sm:hidden'>
						{title}
						<Image alt='대시보드 왕관 아이콘' src={RoyalCrownIcon} />
					</div>
				</Link>
				<nav>
					<div className='m-[1rem] flex gap-5 pr-[1em]'>
						<Link
							href={dashBoardIdEditUrl}
							className='flex items-center justify-center gap-3 rounded-xl border-[0.1rem] border-solid border-gray-D pl-[1.2rem] pr-[1.6rem] text-gray-7'
						>
							<Image alt='관리 버튼 셋팅 아이콘' src={SettingIcon} className='items-center sm:hidden' />
							<span className='text-12-500 sm:items-center sm:pl-2'>관리</span>
						</Link>
						<button
							onClick={additionHandleClick}
							className='flex items-center justify-center gap-3 rounded-xl border-[0.1rem] border-solid border-gray-D pl-[1.2rem] pr-[1.6rem] text-gray-7'
						>
							<Image alt='초대하기 버튼 플러스 아이콘' src={PlusIcon} className='items-center sm:hidden' />
							<span className='text-12-500 sm:items-center sm:pl-2'>초대하기</span>
							{open && <AdditionModal isOpen={open} setOpen={setOpen} />}
						</button>
						{
							<div className='h-[1.8rem] w-[1.8rem] rounded-[3rem] border-2 border-solid border-white'>
								{/* {dashboard map (초대된 유저 프로필 모음) } */}
							</div>
						}
						<Image alt='영역 나누는 라인 이미지' src={Vector} />
						<Link href='/mypage' className='flex items-center justify-center gap-2'>
							<div>
								<Image
									alt='프로필 이미지'
									src={profileImageUrl}
									className='relative h-[3.8rem] w-[3.8rem] rounded-[3rem] border-2 border-solid border-white bg-black-0 '
								/>
								<span className='absolute translate-x-[150%] translate-y-[-130%] text-16-600  text-white'>
									{nickname.slice(0, 1)}
								</span>
							</div>
							<span className='text-16-600 sm:hidden'>{nickname}</span>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
