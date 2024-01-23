import Link from 'next/link';
import Image from 'next/image';
import TaskifyImage from '../../../TaskifyImage.svg';
import Taskify from '../../../Taskify.svg';

export default function Header() {
	return (
		<header className='bg-white fixed inset-x-0 top-0 z-50 left-0'>
			<div className='container mx-auto flex flex-wrap p-5  justify-between md:flex-row items-center'>
				<div className='flex font-medium items-center mb-4 md:mb-0'>
					<Image alt='TaskifyImage' src={TaskifyImage} className='w-8 h-8 -mr-1' />
					<span className='ml-3 text-2xl'>
						{/* { ? <Image alt='이미지 없음' src={null}/> :<Image alt='TaskifyLogo' src={Taskify} />} */}
					</span>
				</div>
				<nav className='md:ml-auto flex flex-wrap items-center justify-center'>
					<div className='mr-5 hover:text-gray-900'>
						<Link href=''>로그인</Link>
					</div>
					<div className='mr-5 hover:text-gray-900'>
						<Link href=''>회원가입</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
