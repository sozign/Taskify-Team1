import Image from 'next/image';
import arrowIcon from '@/../../public/assets/arrowIcon.svg';
import royalCrownIcon from '@/../../public/assets/royalCrownIcon.svg';
import clsx from 'clsx';
import Link from 'next/link';

type DashboardInfo = {
	color: string;
	title: string;
	createdByMe?: boolean;
	dashboardId: number;
};

const colorList: Record<string, string> = {
	'#7AC555': 'bg-green',
	'#760DDE': 'bg-purple',
	'#FFA500': 'bg-orange',
	'#76A6EA': 'bg-blue',
	'#E876EA': 'bg-pink',
};

function DashboardButton({ color, title, createdByMe, dashboardId }: DashboardInfo) {
	return (
		<Link href={`dashboard/${dashboardId}`}>
			<button className=' flex h-[7rem] w-[33.2rem] transform items-center justify-between gap-[1.2rem] overflow-hidden rounded-[0.8rem] border  border-gray-D bg-white px-[2rem] py-[2.6rme] hover:scale-103 md:h-[6.8rem] md:w-[24.7rem] sm:h-[5.8rem] sm:w-[100%]'>
				<div className='flex items-center'>
					<div className={clsx('mr-[1.6rem] h-[0.8rem] w-[0.8rem] rounded-full', `${colorList[color]}`)}></div>
					<div className='flex w-[22rem] items-center gap-[0.8rem] md:w-[15rem] '>
						<div className='sm:text-14-600 overflow-hidden text-ellipsis  whitespace-nowrap break-all text-16-600 text-black-3'>
							{title}
						</div>
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
		</Link>
	);
}

export default DashboardButton;
