import Link from 'next/link';
import Image from 'next/image';
import TaskifyImage from '@/../../public/assets/TaskifyImage.svg';
import Taskify from '@/../../public/assets/Taskify.svg';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../Avatar';
import { getUsers } from '@/lib/api';
import HeaderNavDropdown from './HeaderNavDropdown';
import { useRouter } from 'next/router';

type profileFormData = {
	email: string;
	nickname: string;
	profileImageUrl: string | null;
};

export default function LandingHeader() {
	const [userInfo, setUserInfo] = useState<profileFormData>({
		email: '',
		nickname: '',
		profileImageUrl: '',
	});
	const [userData, setUserData] = useState<string>('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const boardId = +(router.query.boardid ?? 0);

	const userProfileData = async () => {
		const response = await getUsers();
		setUserData(response?.nickname);
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			userProfileData();
		}
	}, [boardId]);

	const loadMember = async () => {
		try {
			const data = await getUsers();
			const { email, nickname, profileImageUrl } = data;
			setUserInfo({ email, nickname, profileImageUrl });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) loadMember();
	}, []);

	useEffect(() => {
		const clickOutside = (e: MouseEvent) => {
			if (isDropdownOpen && !dropDownRef.current?.contains(e.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isDropdownOpen]);

	return (
		<header className='container z-HEADER flex flex-row items-center justify-between pb-[1.5rem] pl-[1.6rem] pt-[1.6rem]'>
			<Link href='/' className='inline-flex  items-center justify-center pl-[0.4rem] pr-[0.4rem] pt-[0.4rem]'>
				<div className='flex h-[3.5rem] items-center justify-end pb-[0.1931rem] pl-[0.6202rem] '>
					<Image alt='TaskifyImage' src={TaskifyImage} className='h-[3.3069rem] w-[2.8797rem]' />
				</div>
				<Image alt='TaskifyLogo' src={Taskify} className='h-[2.2rem] w-[8rem] sm:hidden' />
			</Link>

			<div className='flex flex-row gap-[3.6rem] pr-[4%]'>
				{userData ? (
					<div
						className='relative flex cursor-pointer items-center gap-[1.2rem]'
						ref={dropDownRef}
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<Avatar
							imageUrl={userInfo.profileImageUrl}
							name={userData}
							className='h-[3.8rem] w-[3.8rem] border-2 border-white text-16-600'
						/>
						<span className='text-center text-16-600 sm:hidden'>{userData}</span>
						<div className='absolute right-0 top-[4.5rem]'>{isDropdownOpen && <HeaderNavDropdown />}</div>
					</div>
				) : (
					<>
						<Link href='/login' className='text-16-400  text-black-3'>
							로그인
						</Link>
						<Link href='/signup' className='text-16-400  text-black-3'>
							회원가입
						</Link>
					</>
				)}
			</div>
		</header>
	);
}
