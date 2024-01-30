import { CardData } from '@/constants/types';
import CardLayout from './CardLayout';
import TagChip from '@/components/common/chips/TagChip';
import calenderIcon from '@/../Public/assets/calender.svg';
import Image from 'next/image';

interface TaskCardProps {
	cardItem: CardData;
}

export default function TaskCard({ cardItem }: TaskCardProps) {
	/**
	 * @TODO 할 일 카드모달 추가
	 * @TODO 할 일 수정모달 추가
	 */
	return (
		<>
			<CardLayout>
				<button className='container flex flex-col md:flex-row sm:flex-col'>
					{!!cardItem?.imageUrl && <div>이미지 넣기</div>}
					<div className='container'>
						<div className='mb-[1rem] text-left text-16-500'>{cardItem.title}</div>
						<div className='flex flex-col md:flex-row sm:flex-col'>
							<div className='mb-[1rem] mr-[1.6rem] flex gap-[0.6rem] md:mb-0 sm:mb-[1rem]'>
								{cardItem.tags.map((tagItem) => (
									<TagChip key={tagItem} text={tagItem} />
								))}
							</div>
							<div className='flex flex-grow items-center justify-between'>
								<div className='flex flex-row items-center gap-[0.6rem]'>
									<Image alt='캘린더 모양 아이콘' src={calenderIcon} />
									<div className='text-12-500 text-gray-7'>{cardItem.dueDate.slice(0, 10)}</div>
								</div>
								<div>{cardItem.assignee.nickname}</div>
							</div>
						</div>
					</div>
				</button>
			</CardLayout>
		</>
	);
}
