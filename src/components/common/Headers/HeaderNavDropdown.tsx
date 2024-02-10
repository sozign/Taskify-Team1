import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HeaderNavDropdown() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		if (!localStorage.getItem('accessToken')) {
			router.push('/login');
		}
	};
	return (
		<div className='relative z-NAVDROPDOWN w-[9.3rem] flex-shrink-0 rounded-[0.6rem] border-solid border-gray-D bg-white px-[0.6rem] py-[0.6rem] shadow-[30px_30px_100px_-18px_rgba(0,0,0,0.67)] shadow-black-0'>
			<ul className='text-center text-14-400 leading-[2.4rem]'>
				<li
					onClick={handleLogout}
					className='flex h-[3.2rem] items-center justify-center hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'
				>
					로그아웃
				</li>
				<li className='flex h-[3.2rem] items-center justify-center hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'>
					<Link href='/mypage'>내정보</Link>
				</li>
				<li className='flex h-[3.2rem] items-center justify-center hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'>
					<Link href='/mydashboard'> 내 대시보드</Link>
				</li>
			</ul>
		</div>
	);
}
