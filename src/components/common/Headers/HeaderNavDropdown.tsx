import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HeaderNavDropdown() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		router.push('/');
	};
	return (
		<div className='h-[8.2rem] w-[9.3rem] flex-shrink-0 rounded-[0.6rem] border-solid border-gray-D bg-white shadow-[0_0.4rem_2rem_0] shadow-black-0 sm:w-[7.3rem]'>
			<ul className='text-center text-14-400 leading-[2.4rem]'>
				<li onClick={handleLogout} className='hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'>
					로그아웃
				</li>
				<li className='hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'>
					<Link href='/mypage'>내정보</Link>
				</li>
				<li className='hover:rounded-[0.4rem] hover:bg-violet-F hover:text-violet-5'>
					<Link href='/mydashboard'> 내 대시보드</Link>
				</li>
			</ul>
		</div>
	);
}
