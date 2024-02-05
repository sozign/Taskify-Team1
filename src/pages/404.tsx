import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/common/Buttons/Button';
import notFound from '@/../../Public/images/notFound.png';

export default function Home() {
	const router = useRouter();
	return (
		<div className='flex h-[100vh] items-center justify-center'>
			<div className='flex h-[30rem] gap-[4rem] md:flex-col md:items-center md:justify-center md:px-[4rem] sm:px-[2rem]'>
				<Image src={notFound} alt='404 페이지 이미지' width={500} height={300} />
				<div className='flex flex-col items-center justify-center gap-10 text-22-500'>
					<div className='text-40-700'>웹 페이지를 찾을 수 없습니다.</div>
					<div className='flex flex-col items-center gap-4'>
						<div>{router.asPath}에 오타가 있는지 확인하세요.</div>
						<div>올바른 주소라면 인터넷 연결을 다시 확인해 보세요.</div>
					</div>
					<Button onClick={() => router.push('/')} disabled={false} color='white' variant='confirm'>
						홈으로
					</Button>
				</div>
			</div>
		</div>
	);
}
