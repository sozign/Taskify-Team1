import Link from 'next/link';
import Image from 'next/image';
import Vector from '@/../../Public/assets/Vector.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';

interface userDataProps {
	title: string;
	nickname: string;
	profileImageUrl: string;
}

export default function MyDashboardHeader({ title, nickname, profileImageUrl }: userDataProps) {
	return (
		<header className='container m-3 border-b-[0.1rem] bg-white pb-3 pl-[20.2%] '>
			<div className='flex items-center justify-between'>
				<Link href='/mydashboard'>
					<div className='flex items-center justify-center gap-2 pl-[4.2rem] text-18-700 md:hidden sm:hidden'>
						{title}
						<Image alt='대시보드 왕관 아이콘' src={RoyalCrownIcon} />
					</div>
				</Link>
				<nav>
					<div className='m-[1rem] flex gap-5 pr-[1em]'>
						<Image alt='영역 나누는 라인 이미지' src={Vector} />

						<div className='flex items-center gap-1'>
							<Link href='/mypage'>
								<div className='inline'>
									<Image
										alt='프로필 이미지'
										src={profileImageUrl}
										className='relative inline h-[2.375rem] w-[2.375rem] rounded-[50rem] bg-gray-7'
									/>
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
