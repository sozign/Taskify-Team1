import Image from 'next/image';
import arrowIcon from '@/../../Public/assets/arrowIcon.svg';
import royalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import clsx from 'clsx';

type DashboardInfo = {
	color: string;
	title: string;
	createdByMe?: boolean;
	onClick?: () => void;
};

const colorList: Record<string, string> = {
	'#7AC555': 'bg-green',
	'#760DDE': 'bg-purple',
	'#FFA500': 'bg-orange',
	'#76A6EA': 'bg-blue',
	'#E876EA': 'bg-pink',
};

function DashboardButton({ color, title, createdByMe, onClick }: DashboardInfo) {
	return (
		<button
			onClick={onClick}
			className=' flex h-[7rem] w-[33.2rem] items-center justify-between gap-[1.2rem] overflow-hidden rounded-[0.8rem]  border border-gray-D bg-white px-[2rem] py-[2.6rme] md:h-[6.8rem] md:w-[24.7rem] sm:h-[5.8rem] sm:w-[100%]'
		>
			<div className='flex items-center'>
				<div className={clsx('mr-[1.6rem] h-[0.8rem] w-[0.8rem] rounded-full', `${colorList[color]}`)}></div>
				<div className='flex items-center gap-[0.8rem]  overflow-hidden'>
					<div className='sm:text-14-600 text-16-600 text-black-3'>{title}</div>
					{createdByMe ? (
						<Image
							src={royalCrownIcon}
							className='flex h-[1.6rem] w-[2rem] md:h-[1.4rem] md:w-[1.75rme] sm:h-[1.2rem] sm:w-[1.5re]'
							alt='왕관 아이콘'
						/>
					) : null}
				</div>
			</div>
			<div className=' relative h-[1.8rem] w-[1.8rem]'>
				<Image fill src={arrowIcon} alt='화살표 아이콘' />
			</div>
		</button>
	);
}

export default DashboardButton;
