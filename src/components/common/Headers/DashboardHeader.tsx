import Link from 'next/link';
import Image from 'next/image';
import PlusIcon from '@/../../Public/assets/PlusIcon.svg';
import SettingIcon from '@/../../Public/assets/settingIcon.svg';
import Vector from '@/../../Public/assets/Vector.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import { useState } from 'react';

interface userDataProps {
	id: number;
	title: string;
	nickname: string;
	profileImageUrl: string;
}

export default function DashboardHeader({ id, title, nickname, profileImageUrl }: userDataProps) {
	const [additionModal, setAdditionModal] = useState<boolean>(false);
	const dashBoardIdEditUrl = `/dashboard/${id}/edit`;

	const additionHandleClick = () => {
		setAdditionModal((prev) => !prev);
	};

	return (
		<header className='container m-3 border-b-[0.1rem] bg-white pb-3 pl-[20.2%] '>
			<div className='flex items-center justify-around'>
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
							className='flex items-center justify-center gap-3 rounded-xl border-[0.1rem] border-solid border-gray-D pl-[1.2rem] pr-[1.6rem] text-gray-7 hover:border-2'
						>
							<Image alt='관리 버튼 셋팅 아이콘' src={SettingIcon} className='items-center sm:hidden' />
							<span className='text-12-500'>관리</span>
						</Link>

						<button
							onClick={additionHandleClick}
							className='flex items-center justify-center gap-3 rounded-xl border-[0.1rem] border-solid border-gray-D pl-[1.2rem] pr-[1.6rem] text-gray-7 hover:border-2'
						>
							<Image alt='초대하기 버튼 플러스 아이콘' src={PlusIcon} className='items-center sm:hidden' />
							<span className='text-12-500'>초대하기</span>
						</button>
						{
							<div className='flex items-center '>
								{/* {dashboard profileImageUrl map (초대된 유저 프로필 모음) } */}
							</div>
						}
						<Image alt='영역 나누는 라인 이미지' src={Vector} />

						<div className='flex items-center gap-1'>
							<Link href='/mypage'>
								<div className='inline'>
									<Image alt='프로필 이미지' src={profileImageUrl} className='relative inline bg-gray-7' />
									<span className='absolute  z-10 translate-x-[-50%] text-12-600 text-white'>
										{nickname.slice(0, 1)}
									</span>
								</div>
								<span className='text-12-500 sm:hidden'>{nickname}</span>
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
