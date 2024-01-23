import Link from 'next/link';
import Image from 'next/image';
import TaskifyImage from '../../../Public/assets/TaskifyImage.svg';
import Taskify from '../../../Public/assets/Taskify.svg';

export default function Header() {
	return (
		<header className='bg-white fixed inset-x-0 top-0 z-50 left-0'>
			<div className='container mx-auto flex flex-wrap p-5  justify-between md:flex-row items-center'>
				<Link href='/' className='cursor-pointer'>
					<div className='flex font-medium items-center mb-4 md:mb-0'>
						<Image alt='TaskifyImage' src={TaskifyImage} className='w-8 h-8 -mr-1' />
						<span className='ml-3 text-2xl'>
							<Image alt='TaskifyLogo' src={Taskify} className='sm:hidden' />
						</span>
					</div>
				</Link>
				<nav className='md:ml-auto flex flex-wrap items-center justify-center'>
					<div className='mr-5 hover:'>
						<Link href='/login'>로그인</Link>
					</div>
					<div className='mr-5 hover:text-gray-900'>
						<Link href='/signup'>회원가입</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
