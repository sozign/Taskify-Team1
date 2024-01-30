import { CardData, ColumnData } from '@/constants/types';
import { getCards } from '@/lib/api';
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import SquareChip from '@/components/common/chips/SquareChip';
import bullet from '@/../Public/assets/bullet.svg';
import setting from '@/../Public/assets/settingIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import addIcon from '@/../../Public/assets/addIcon.svg';
import { useRouter } from 'next/router';

interface ColumnLayout {
	columnItem: ColumnData;
}

export default function Column({ columnItem }: ColumnLayout) {
	const router = useRouter();
	const { boardid } = router.query;

	const [cardList, setCardList] = useState<CardData[] | null>(null);

	async function loadCardList(columnId: number) {
		const query = {
			size: 10,
			cursorId: 0,
			columnId,
		};
		const data = await getCards(query);
		setCardList(data.cards);
	}

	useEffect(() => {
		loadCardList(columnItem.id);
	}, []);

	if (!cardList) return;

	return (
		<div className='container border-b-[0.1rem] border-r-[0.1rem] bg-gray-F px-[2rem] pb-[2rem] pt-[2.2rem] sm:px-[1.2rem] sm:pt-[1.7rem]'>
			<div className='mb-[2.5rem] flex items-center justify-between sm:mb-[1.7rem] '>
				<div className='flex items-center'>
					<Image className='mr-[0.6rem]' alt='불렛모양 아이콘' src={bullet} />
					<div className='sm:text-16-700 mr-[1.2rem] text-18-700 text-black-3'>{columnItem.title}</div>
					<SquareChip color='gray'>{cardList.length}</SquareChip>
				</div>
				<Link href={`${boardid}/edit`}>
					<Image alt='설정 아이콘' src={setting} />
				</Link>
			</div>
			<div className='flex flex-col gap-[1.6rem]'>
				<button className='flex justify-center rounded-[0.6rem] border-[0.1rem] border-gray-D bg-white py-[0.9rem]'>
					<SquareChip color='violet'>
						<Image className='px-[0.6rem] py-[0.6rem]' fill src={addIcon} alt='추가하기 아이콘' />
					</SquareChip>
				</button>
				{cardList.map((cardItem) => (
					<TaskCard key={cardItem.id} cardItem={cardItem} />
				))}
			</div>
		</div>
	);
}
