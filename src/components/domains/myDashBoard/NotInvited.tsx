import Image from 'next/image';
import notInvited from '@/../../Public/assets/NotInvited.svg';

function NotInvited() {
	return (
		<div className='relative flex h-[35rem]  w-[100%]  flex-col items-center gap-[3rem] pt-[8.475rem] sm:gap-[1.9rem] '>
			<Image className=' w-[8.75rem] sm:w-[5.25rem]' src={notInvited} alt='초대 대시보드 비워져있는 상태 아이콘' />
			<div className=' text-18-500 text-gray-9 sm:text-14-500'>아직 초대받은 대시보드가 없어요</div>
		</div>
	);
}

export default NotInvited;
