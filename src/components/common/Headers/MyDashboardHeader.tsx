import Link from 'next/link';
import Image from 'next/image';
import Vector from '@/../../Public/assets/Vector.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import { useRouter } from 'next/router';

interface userDataProps {
	title: string;
	nickname: string;
	profileImageUrl: string;
}

export default function MyDashboardHeader({ title, nickname, profileImageUrl }: userDataProps) {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		router.push('/');
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
						<Image alt='영역 나누는 라인 이미지' src={Vector} />
						<Link href='/mypage' className='flex items-center justify-center gap-2'>
							<div className=''>
								<Image
									alt='프로필 이미지'
									src={profileImageUrl}
									className='relative h-[3.8rem] w-[3.8rem] rounded-[3rem] border-2 border-solid border-white bg-black-0 '
								/>
								<span className='absolute z-10 translate-x-[150%] translate-y-[-130%] text-16-600  text-white'>
									{nickname.slice(0, 1)}
								</span>
							</div>
							<span className='text-16-600 sm:hidden'>{nickname}</span>
							<button
								onClick={handleLogout}
								className='flex cursor-pointer items-center justify-center gap-2 text-red-500'
							>
								로그아웃
							</button>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
