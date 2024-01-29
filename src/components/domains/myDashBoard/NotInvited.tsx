import Image from 'next/image';
import notInvited from '@/../../Public/assets/notInvited.svg';

function NotInvited() {
	return (
		<div className=' flex flex-col items-center justify-center gap-[2.4rem] sm:gap-[1.6rem]'>
			<div className='relative h-[10rem] w-[10rem] sm:h-[6rem] sm:w-[6rem]'>
				<Image fill src={notInvited} alt='초대 대시보드 비워져있는 상태 아이콘' />
			</div>
			<div className=' text-18-500 text-gray-9 sm:text-14-500'>아직 초대받은 대시보드가 없어요</div>
		</div>
	);
}

export default NotInvited;
