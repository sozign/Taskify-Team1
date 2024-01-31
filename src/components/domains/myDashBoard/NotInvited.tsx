import Image from 'next/image';
import notInvited from '@/../../Public/assets/notInvited.svg';

function NotInvited() {
	return (
		<div className='flex h-[40rem] w-[102.2rem] flex-col gap-[6.6rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:gap-[10.5rem] sm:px-[2.4rem] sm:py-[2.4rem]'>
			<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
			<div className='relative flex  w-[100%] flex-col items-center justify-center gap-[3rem] sm:gap-[1.9rem] '>
				<Image className=' w-[8.75rem] sm:w-[5.25rem]' src={notInvited} alt='초대 대시보드 비워져있는 상태 아이콘' />
				<div className=' text-18-500 text-gray-9 sm:text-14-500'>아직 초대받은 대시보드가 없어요</div>
			</div>
		</div>
	);
}

export default NotInvited;
