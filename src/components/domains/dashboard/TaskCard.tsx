import { CardData } from '@/constants/types';
import CardLayout from './CardLayout';
import TagChip from '@/components/common/chips/TagChip';
import calenderIcon from '@/../public/assets/calender.svg';
import Image from 'next/image';
import Avatar from '@/components/common/Avatar';
import { useState } from 'react';
import TaskModal from '@/components/modal/TaskModal';
import TaskEditModal from '@/components/modal/TaskEditModal';

interface TaskCardProps {
	cardItem: CardData;
	columnInfo: { id: number; title: string };
}

export default function TaskCard({ cardItem, columnInfo }: TaskCardProps) {
	// 모달 관련
	const [isTaskCardModalOpen, setIsTaskCardModalOpen] = useState<boolean>(false);
	const [isTaskCardEditModalOpen, setIsTaskCardEditModalOpen] = useState<boolean>(false);

	return (
		<>
			<CardLayout>
				<button
					onClick={() => {
						setIsTaskCardModalOpen(true);
					}}
					className=' container flex flex-col md:flex-row sm:flex-col'
				>
					{!!cardItem?.imageUrl && (
						<div className='mb-[1.2rem] h-auto w-full flex-grow md:mb-0 md:mr-[2rem] md:h-[5.3rem] md:w-auto sm:mb-[1rem] sm:h-auto sm:w-full '>
							<Image
								alt={`할 일 ${cardItem.title}을 설명하는 이미지`}
								width={250}
								height={150}
								className='w-full rounded-[0.6rem] md:h-full sm:w-full'
								src={cardItem.imageUrl}
							/>
						</div>
					)}
					<div className='container md:flex md:flex-col md:justify-between md:self-stretch'>
						<div className='mb-[1rem] text-left text-16-500 leading-[1.9rem]'>{cardItem.title}</div>
						<div className='flex flex-col flex-wrap md:flex-row sm:flex-col'>
							<div className='mb-[1rem] flex flex-wrap gap-[0.6rem] md:mb-0 md:mr-[1.6rem] sm:mb-[1rem]'>
								{cardItem.tags.map((tagItem) => (
									<TagChip key={tagItem} text={tagItem} />
								))}
							</div>
							<div className='flex flex-grow items-center justify-between'>
								<div className='flex flex-row flex-wrap items-center gap-[0.6rem]'>
									{cardItem?.dueDate && (
										<>
											<Image alt='캘린더 모양 아이콘' src={calenderIcon} />
											<div className='text-12-500 text-gray-7'>{cardItem.dueDate.slice(0, 10)}</div>
										</>
									)}
								</div>
								<div>
									{cardItem?.assignee && (
										<Avatar
											imageUrl={cardItem.assignee.profileImageUrl}
											className='h-[2.4rem] w-[2.4rem]'
											name={cardItem.assignee.nickname}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</button>
			</CardLayout>
			<TaskModal
				taskModalControl={{
					isTaskCardModalOpen: isTaskCardModalOpen,
					setIsTaskCardModalOpen: setIsTaskCardModalOpen,
				}}
				editModalControl={{
					isTaskCardEditModalOpen: isTaskCardEditModalOpen,
					setIsTaskCardEditModalOpen: setIsTaskCardEditModalOpen,
				}}
				cardItem={cardItem}
				columnInfo={columnInfo}
			/>
			<TaskEditModal
				editModalControl={{
					isTaskCardEditModalOpen: isTaskCardEditModalOpen,
					setIsTaskCardEditModalOpen: setIsTaskCardEditModalOpen,
				}}
				cardItem={cardItem}
				columnInfo={columnInfo}
			/>
		</>
	);
}
