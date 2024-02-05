import Link from 'next/link';
import Image from 'next/image';
import TaskifyImage from '@/../../Public/assets/TaskifyImage.svg';
import Taskify from '@/../../Public/assets/Taskify.svg';

export default function LandingHeader() {
	return (
		<header className='container flex flex-row items-center justify-between pb-[1.5rem] pl-[1.6rem] pt-[1.6rem]'>
			<Link href='/' className='inline-flex  items-center justify-center pl-[0.4rem] pr-[0.4rem] pt-[0.4rem]'>
				<div className='flex h-[3.5rem] items-center justify-end pb-[0.1931rem] pl-[0.6202rem] '>
					<Image alt='TaskifyImage' src={TaskifyImage} className='h-[3.3069rem] w-[2.8797rem]' />
				</div>
				<Image alt='TaskifyLogo' src={Taskify} className='h-[2.2rem] w-[8rem] sm:hidden' />
			</Link>

			<div className='flex flex-row gap-[3.6rem] pr-[4%]'>
				<Link href='/login' className='text-16-400  text-black-3'>
					로그인
				</Link>
				<Link href='/signup' className='text-16-400  text-black-3'>
					회원가입
				</Link>
			</div>
		</header>
	);
}
