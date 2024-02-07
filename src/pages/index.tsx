import { useRouter } from 'next/router';
import Image from 'next/image';
import LandingHeader from '@/components/common/Headers/LandingHeader';
import people from '@/../../Public/images/people.png';
import landing1 from '@/../../Public/images/landing1.png';
import landing2 from '@/../../Public/images/landing2.png';
import landing3 from '@/../../Public/images/landing3.png';
import landing4 from '@/../../Public/images/landing4.png';
import landing5 from '@/../../Public/images/landing5.png';
import email from '@/../../Public/assets/email.svg';
import facebook from '@/../../Public/assets/facebook.svg';
import instagram from '@/../../Public/assets/instagram.svg';
import logo from '@/../../Public/assets/logo.svg';
import logoTitle from '@/../../Public/assets/logoTitle.svg';
import { useEffect, useState } from 'react';

export default function Home() {
	const [isToken, setIsToken] = useState<string | null>();
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		setIsToken(accessToken);
	}, []);

	const router = useRouter();
	return (
		<div>
			<LandingHeader />
			<div className=' mt-[9.4rem] flex flex-col items-center gap-[9rem] px-[4rem] sm:mt-[4.2rem] sm:gap-[8rem] sm:px-[1.6rem]'>
				<div className='mb-[9.4rem] flex flex-col items-center gap-[4.82rem] sm:mb-0 sm:gap-[2.6rem]'>
					<div className='relative h-[42.3rem] w-[72.2rem] bg-violet-5 md:h-[31.5rem] md:w-[53.7rem] sm:h-[16.8rem] sm:w-[28.7rem]'>
						<div className='mt-[9.1rem] flex items-center justify-center md:mt-[6.6rem] sm:mt-[3.7rem]'>
							<Image src={logo} alt='로고 이미지' className='md:w-[3.5rem] sm:w-[1.9rem]' />
							<Image src={logoTitle} alt='로고 타이틀' className='md:w-[9.3rem] sm:w-[5rem]' />
						</div>
						<Image className='absolute bottom-0' src={people} alt='랜딩 페이지 사람 이미지' />
					</div>
					<div className='flex flex-col items-center gap-[2.4rem] sm:gap-[1.8rem]'>
						<div className='flex items-center text-76-700 leading-[10rem] text-black-0 md:text-56-700 sm:flex-col sm:text-40-700 sm:leading-normal'>
							새로운 일정 관리
							<span className='font-montserrat text-90-700 leading-[6.5rem] text-violet-5 md:text-70-700 sm:text-42-700 sm:leading-normal'>
								Taskify
							</span>
						</div>
						<div className='flex flex-col items-center gap-[6.6rem] sm:gap-[7rem]'>
							<span className='text-18-400 text-black-0 md:text-16-400 sm:text-12-400'>
								서비스의 메인 설명 들어갑니다.
							</span>
							{isToken ? (
								<button
									onClick={() => router.push('/mydashboard')}
									className='flex h-[5rem] w-[28rem] items-center justify-center rounded-[0.8rem] bg-violet-5 pb-[1.4rem] pt-[1.5rem] text-18-500 text-white md:text-16-500 sm:h-[4.2rem] sm:w-[23.52rem] sm:pb-[1.2rem] sm:pt-[1.3rem] sm:text-14-500'
								>
									대시보드로 이동하기
								</button>
							) : (
								<button
									onClick={() => router.push('/login')}
									className='flex h-[5rem] w-[28rem] items-center justify-center rounded-[0.8rem] bg-violet-5 pb-[1.4rem] pt-[1.5rem] text-18-500 text-white md:text-16-500 sm:h-[4.2rem] sm:w-[23.52rem] sm:pb-[1.2rem] sm:pt-[1.3rem] sm:text-14-500'
								>
									로그인하기
								</button>
							)}
						</div>
					</div>
				</div>
				<div className='box1 flex h-[60rem] w-[120rem] justify-between rounded-[0.8rem] bg-black-4 md:h-fit md:w-full md:flex-col md:items-end md:gap-[11.7rem]'>
					<div className='mt-[12.3rem] flex flex-col gap-[10rem] pl-[6rem] md:mt-[6.3rem] md:w-full sm:mt-[6rem] sm:items-center sm:gap-[6.1rem] sm:p-0'>
						<span className='text-22-500 text-gray-9 sm:text-18-500'>Point 1</span>
						<div className='flex flex-col text-48-700 leading-[6.4rem] text-white sm:items-center sm:text-36-700'>
							<span>일의 우선순위를</span>
							<span>관리하세요</span>
						</div>
					</div>
					<div className='mt-[10.3rem] flex h-[49.7rem] w-[59.4rem] flex-shrink-0 justify-end md:h-full sm:mt-[7.7rem] sm:h-[24.8rem] sm:w-[29.6rem]'>
						<Image className='rounded-tl-[0.8rem]' src={landing1} alt='랜딩 페이지 이미지 1' />
					</div>
				</div>
				<div className='box2 flex h-[60rem] w-[120rem] gap-[10rem] rounded-[0.8rem] bg-black-4  md:h-fit md:w-full md:flex-col-reverse'>
					<div className='ml-[10.8rem] mt-[9.8rem] flex h-[50.2rem] w-[43.6rem] flex-shrink-0 justify-end md:mx-auto md:mt-[14rem] md:h-[41.5rem] md:w-[36rem] sm:mt-[9.2rem] sm:h-[25rem] sm:w-[21.7rem]'>
						<Image className='rounded-t-[0.8rem]' src={landing2} alt='랜딩 페이지 이미지 2' />
					</div>
					<div className='mt-[12.3rem] flex flex-col gap-[10rem] md:mt-[6.3rem] md:pl-[6rem] sm:mt-[6rem] sm:items-center sm:gap-[6.1rem] sm:p-0'>
						<span className='text-22-500 text-gray-9 sm:text-18-500'>Point 2</span>
						<div className='flex flex-col text-48-700 leading-[6.4rem] text-white sm:items-center sm:text-36-700'>
							<span>해야 할 일을</span>
							<span>등록하세요</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-[3.6rem] sm:w-full sm:items-center sm:gap-[4.2rem]'>
					<span className='text-black text-28-700 sm:text-22-700'>생산성을 높이는 다양한 설정 ⚡</span>
					<div className='flex gap-[3.3rem] md:flex-col md:items-center md:gap-[4.8rem] sm:w-full sm:gap-[4.05rem]'>
						<div className='flex w-[37.8rem] flex-col sm:w-full'>
							<div className='flex h-[26rem] flex-shrink-0 items-center justify-center rounded-t-[0.8rem] bg-black-4 sm:h-[23.6rem]'>
								<Image
									className='h-[12.4rem] w-[30rem] sm:h-[10.7rem] sm:w-[26rem]'
									src={landing3}
									alt='랜딩 페이지 이미지 3'
								/>
							</div>
							<div className='flex h-[12.4rem] flex-col gap-[1.8rem] rounded-b-[0.8rem] bg-black-1 pl-[3.2rem] pt-[3.3rem] text-16-500 text-white sm:h-[11.3rem] sm:pt-[2.7rem]'>
								<span className='text-18-700'>대시보드 설정</span>
								<span>대시보드 사진과 이름을 변경할 수 있어요.</span>
							</div>
						</div>
						<div className='flex w-[37.8rem] flex-col sm:w-full'>
							<div className='flex h-[26rem] flex-shrink-0 items-center justify-center rounded-t-[0.8rem] bg-black-4 sm:h-[23.6rem]'>
								<Image
									className='h-[23.1rem] w-[30rem] sm:h-[20rem] sm:w-[26rem]'
									src={landing4}
									alt='랜딩 페이지 이미지 4'
								/>
							</div>
							<div className='flex h-[12.4rem] flex-col gap-[1.8rem] rounded-b-[0.8rem] bg-black-1 pl-[3.2rem] pt-[3.3rem] text-16-500 text-white sm:h-[11.3rem] sm:pt-[2.7rem]'>
								<span className='text-18-700'>초대</span>
								<span>새로운 팀원을 초대할 수 있어요.</span>
							</div>
						</div>
						<div className='flex w-[37.8rem] flex-col sm:w-full'>
							<div className='flex h-[26rem] flex-shrink-0 items-center justify-center rounded-t-[0.8rem] bg-black-4 sm:h-[23.6rem]'>
								<Image
									className='h-[19.5rem] w-[30rem] sm:h-[16.9rem] sm:w-[26rem]'
									src={landing5}
									alt='랜딩 페이지 이미지 5'
								/>
							</div>
							<div className='flex h-[12.4rem] flex-col gap-[1.8rem] rounded-b-[0.8rem] bg-black-1 pl-[3.2rem] pt-[3.3rem] text-16-500 text-white sm:h-[11.3rem] sm:pt-[2.7rem]'>
								<span className='text-18-700'>구성원</span>
								<span>구성원을 초대하고 내보낼 수 있어요.</span>
							</div>
						</div>
					</div>
				</div>
				<div className='footer mt-[7rem] flex h-[10rem] w-full items-center justify-between px-[14rem] text-16-400 text-black-4 sm:mt-[4rem] sm:h-[21.6rem] sm:flex-col sm:justify-normal sm:gap-[1.2rem] sm:px-0 sm:text-12-400'>
					<div>©codeit - 2023</div>
					<div className='flex gap-[3.2rem] sm:gap-[2rem]'>
						<div className='flex'>Privacy Policy</div>
						<div>FAQ</div>
					</div>
					<div className='flex items-center gap-[1.4rem] sm:mt-[5.6rem] sm:gap-[2.05rem]'>
						<button className='h-[2rem] w-[2rem] sm:h-[1.6rem] sm:w-[1.6rem]'>
							<Image width={20} height={20} src={email} alt='이메일 아이콘' />
						</button>
						<button
							onClick={() => window.open('https://www.facebook.com', '_blank')}
							className='h-[2.2rem] w-[2.2rem] sm:h-[1.8rem] sm:w-[1.8rem]'
						>
							<Image width={22} height={22} src={facebook} alt='페이스북 아이콘' />
						</button>
						<button
							onClick={() => window.open('https://www.instagram.com', '_blank')}
							className='h-[2.2rem] w-[2.2rem] sm:h-[1.8rem] sm:w-[1.8rem]'
						>
							<Image width={22} height={22} src={instagram} alt='인스타그램 아이콘' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
