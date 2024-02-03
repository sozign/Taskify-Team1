import Layout from './Layout';
import Image from 'next/image';
import StatusChip from '../common/chips/StatusChip';
import TagChip from '../common/chips/TagChip';
import { Dispatch, SetStateAction } from 'react';
import { CardData } from '@/constants/types';
import Avatar from '../common/Avatar';

interface TaskModalProps {
	isTaskCardModalOpen: boolean;
	setIsTaskCardModalOpen: Dispatch<SetStateAction<boolean>>;
	cardItem: CardData;
	columnTitle: string;
}

export default function TaskModal({
	isTaskCardModalOpen,
	setIsTaskCardModalOpen,
	cardItem,
	columnTitle,
}: TaskModalProps) {
	return (
		<Layout $modalType='Task' isOpen={isTaskCardModalOpen} setOpen={setIsTaskCardModalOpen}>
			<div className='mb-[2.4rem] flex flex-row justify-between sm:mb-[1.6rem] sm:flex-col-reverse'>
				<p className='text-24-700'>{cardItem.title}</p>
				<div className='self-end'>
					<button className='mr-[2.4rem] sm:mr-[1.6rem]'>
						<Image alt='할 일을 수정하거나 삭제할 수 있는 버튼' width={28} height={28} src={'/assets/kebab.png'} />
					</button>
					<button
						onClick={() => {
							setIsTaskCardModalOpen(false);
						}}
					>
						<Image alt='모달창을 닫을 수 있는 버튼' width={28} height={28} src={'/assets/Close.svg'} />
					</button>
				</div>
			</div>
			<div className=' flex flex-row-reverse gap-[2.4rem] sm:flex-col sm:gap-0'>
				{(cardItem?.assignee || cardItem?.dueDate) && (
					<div className='flex grow-[1] flex-col self-start rounded-[0.8rem] border-[0.1rem] border-gray-D px-[1.6rem] py-[1.6rem] sm:mb-[1.6rem] sm:flex-row sm:self-stretch'>
						<div className='mb-[2rem] grow sm:mb-0'>
							{cardItem?.assignee && (
								<>
									<p className='mb-[0.6rem] text-12-500 sm:mb-[0.4rem]'>담당자</p>
									<div className='flex items-center gap-[0.8rem]'>
										<Avatar className='h-[2.4rem] w-[2.4rem]' name={cardItem.assignee.nickname} />
										<div>{cardItem.assignee.nickname}</div>
									</div>
								</>
							)}
						</div>
						<div className='grow'>
							{cardItem?.dueDate && (
								<>
									<p className='mb-[0.6rem] text-12-500 sm:mb-[0.4rem]'>마감일</p>
									<p className='text-14-700'>{cardItem.dueDate}</p>
								</>
							)}
						</div>
					</div>
				)}
				<div className='grow-[2]'>
					<div className='mb-[1.6rem] flex'>
						<StatusChip className='flex-shrink-0' value={columnTitle} />
						{!!cardItem.tags.length && (
							<div className='ml-[2rem] border-l-[0.1rem] border-gray-D pl-[2rem] sm:ml-[1.2rem] sm:pl-[1.2rem]'>
								<div className='flex flex-grow flex-wrap gap-[0.6rem]'>
									{cardItem.tags.map((tag) => {
										return <TagChip key={tag} text={tag} />;
									})}
								</div>
							</div>
						)}
					</div>
					<div className='mb-[1.6rem] text-12-400'>{cardItem.description}</div>
					{!!cardItem?.imageUrl && (
						<div className='mb-[2.4rem] sm:mb-[1.9rem]'>
							<Image
								alt={`할 일 ${cardItem.title}을 설명하는 이미지`}
								width={250}
								height={150}
								className='w-full rounded-[0.6rem] md:h-full sm:w-full'
								src={cardItem.imageUrl}
							/>
						</div>
					)}
					<div>댓글 입력 영역</div>
					<div>댓글 확인 영역</div>
				</div>
			</div>
		</Layout>
	);
}
