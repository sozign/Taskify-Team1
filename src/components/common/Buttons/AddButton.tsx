import SquareChip from '@/components/common/chips/SquareChip';
import { ReactNode } from 'react';

function AddButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className='flex h-[7rem] w-[33.2rem] items-center justify-center gap-[1.2rem] rounded-[0.8rem] border border-gray-D bg-white md:h-[6.8rem] md:w-[24.7rem] sm:h-[5.8rem] sm:w-[100%]'
		>
			<div className=' sm:text-14-600 text-16-600 text-black-3'>새로운 대시보드</div>
			<div>
				<SquareChip color='violet'>{children}</SquareChip>
			</div>
		</button>
	);
}

export default AddButton;
