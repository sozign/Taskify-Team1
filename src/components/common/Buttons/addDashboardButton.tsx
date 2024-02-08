import SquareChip from '@/components/common/chips/SquareChip';
import addIcon from '@/../../public/assets/addIcon.svg';
import Image from 'next/image';

function AddDashboardButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className='flex h-[7rem] w-[33.2rem] items-center justify-center gap-[1.2rem] rounded-[0.8rem] border border-gray-D bg-white md:h-[6.8rem] md:w-[24.7rem] sm:h-[5.8rem] sm:w-[100%]'
		>
			<div className=' sm:text-14-600 text-16-600 text-black-3'>새로운 대시보드</div>
			<div>
				<SquareChip color='violet'>
					<Image className='h-[1rem] w-[1rem] sm:h-[0.9rem] sm:w-[0.9rem]' src={addIcon} alt='추가하기 아이콘' />
				</SquareChip>
			</div>
		</button>
	);
}

export default AddDashboardButton;
