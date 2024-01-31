import Button from '@/components/common/Buttons/Button';
import Image from 'next/image';
import searchIcon from '@../../../Public/assets/searchIcon.svg';

function InvitationList() {
	return (
		<div className='flex h-[100%] w-[102.2rem] flex-col gap-[2rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:gap-[10.5rem] sm:px-[2.4rem] sm:py-[2.4rem]'>
			<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
			<div className='relative'>
				<Image
					src={searchIcon}
					className='absolute left-[1.4rem] top-[23%] h-[2.4rem] w-[2.4rem] sm:h-[2.2rem] sm:w-[2.2rem]'
					alt='검색 아이콘'
				/>
				<input
					placeholder='검색'
					className='w-[100%] rounded-[0.6rem] border border-gray-D px-[4.2rem] py-[1.1rem] text-14-500 sm:px-[4.4rem]'
				/>
			</div>
			<div className='mt-[0.4rem] flex items-center justify-start text-16-400 text-gray-9 '>
				<div className='mr-[6rem] flex-grow'>이름</div>
				<div className='flex-grow'>초대자</div>
				<div className='flex-grow'>수락여부</div>
			</div>

			<div className='flex items-center justify-around border-b py-[2.7rem] text-16-500 text-black-3'>
				<div className='flex-grow'>프로덕트 디자인</div>
				<div className='flex-grow'>손동희</div>
				<div className='flex flex-grow gap-[1rem]'>
					<Button variant='confirm' color='violet'>
						수락
					</Button>
					<Button variant='confirm' color='white'>
						거절
					</Button>
				</div>
			</div>
		</div>
	);
}

export default InvitationList;
