import Link from 'next/link';
import Image from 'next/image';
import TaskifyImage from '@/../../Public/assets/TaskifyImage.svg';
import Taskify from '@/../../Public/assets/Taskify.svg';

export default function LandingHeader() {
	return (
		<header className='container flex flex-row items-center justify-between px-[5rem] pb-[1.56rem] pt-[1.62rem]'>
			<Link href='/' className='inline-flex  items-center justify-center pl-1 pr-[0.125rem] pt-1 '>
				<Image alt='TaskifyImage' src={TaskifyImage} />
				<Image alt='TaskifyLogo' src={Taskify} className='sm:hidden' />
			</Link>

			<div className='flex flex-row gap-[2.25rem]'>
				<Link href='/login' className='text-10-400 font-normal text-black-3'>
					로그인
				</Link>
				<Link href='/signup' className='text-10-400 font-normal text-black-3'>
					회원가입
				</Link>
			</div>
		</header>
	);
}
