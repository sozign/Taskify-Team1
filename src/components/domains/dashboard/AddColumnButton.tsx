import SquareChip from '@/components/common/chips/SquareChip';
import addIcon from '@/../../Public/assets/addIcon.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

function AddColumnButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={() => onClick()}
			className='flex h-[7rem] w-[35.4rem] flex-shrink-0 items-center justify-center gap-[1.2rem] rounded-[0.8rem] border border-gray-D bg-white md:h-[6.8rem] md:w-full sm:h-[5.8rem] sm:w-[100%]'
		>
			<div className=' sm:text-14-600 flex-shrink-0 text-18-700 text-black-3'>새로운 컬럼 추가하기</div>
			<div>
				<SquareChip color='violet'>
					<Image className='h-[1rem] w-[1rem] sm:h-[0.9rem] sm:w-[0.9rem]' src={addIcon} alt='추가하기 아이콘' />
				</SquareChip>
			</div>
		</button>
	);
}

export default AddColumnButton;
