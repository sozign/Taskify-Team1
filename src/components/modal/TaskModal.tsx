import Layout from './Layout';
import Image from 'next/image';
import StatusChip from '../common/chips/StatusChip';
import TagChip from '../common/chips/TagChip';
import React, { Dispatch, LegacyRef, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import { CardData, CommentPost, CommentData } from '@/constants/types';
import Avatar from '../common/Avatar';
import { getComments, postComment } from '@/lib/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface TaskModalProps {
	isTaskCardModalOpen: boolean;
	setIsTaskCardModalOpen: Dispatch<SetStateAction<boolean>>;
	cardItem: CardData;
	columnInfo: { id: number; title: string };
}

export default function TaskModal({
	isTaskCardModalOpen,
	setIsTaskCardModalOpen,
	cardItem,
	columnInfo,
}: TaskModalProps) {
	const router = useRouter();
	const boardId = +(router.query.boardid ?? 0);

	const [commentsList, setCommentsList] = useState<null | CommentData[]>(null);
	async function loadComments() {
		const query = {
			size: 10,
			cursorId: 0,
			cardId: cardItem.id,
		};
		const data = await getComments(query);
		setCommentsList(data.comments);
	}

	useEffect(() => {
		loadComments();
	}, []);

	const { register, handleSubmit } = useForm<Pick<CommentPost, 'content'>>({
		mode: 'onChange',
		defaultValues: {
			content: '',
		},
		shouldUnregister: true,
	});

	const onSubmit: SubmitHandler<Pick<CommentPost, 'content'>> = async (data) => {
		const submitValue = {
			cardId: cardItem.id,
			columnId: columnInfo.id,
			dashboardId: boardId,
			content: data.content,
		};

		postComment(submitValue);
	};

	const dropDownref = useRef<HTMLDivElement>(null);
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const handleOutsideClick: EventListener = (e) => {
		if (dropDownref.current && !dropDownref.current.contains(e.target as HTMLElement)) {
			setIsOpened(false);
		}
	};

	if (!commentsList) return;
	return (
		<Layout $modalType='Task' isOpen={isTaskCardModalOpen} setOpen={setIsTaskCardModalOpen}>
			<div onClick={handleOutsideClick as unknown as MouseEventHandler<HTMLDivElement>}>
				<div className='mb-[2.4rem] flex flex-row justify-between sm:mb-[1.6rem] sm:flex-col-reverse'>
					<p className='text-24-700'>{cardItem.title}</p>
					<div className='self-end'>
						<div ref={dropDownref} className='relative mr-[2.4rem] inline-block sm:mr-[1.6rem]'>
							<button
								onClick={() => {
									setIsOpened(true);
								}}
							>
								<Image alt='할 일을 수정하거나 삭제할 수 있는 버튼' width={28} height={28} src={'/assets/kebab.png'} />
							</button>
							{isOpened && (
								<ul className='absolute right-[0.8rem] top-[2.8rem] w-[9.6rem] rounded-[0.6rem] border-[0.1rem] border-gray-D bg-white px-[0.6rem] py-[0.6rem] sm:w-[8.6rem]'>
									<li className='flex h-[3.2rem] items-center justify-center rounded-[0.4rem] text-14-400 text-black-3 hover:bg-violet-F hover:text-violet-5'>
										수정하기
									</li>
									<li className='flex h-[3.2rem] items-center justify-center rounded-[0.4rem] text-14-400 text-black-3 hover:bg-violet-F hover:text-violet-5'>
										삭제하기
									</li>
								</ul>
							)}
						</div>
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
					<div className='flex basis-1/3 flex-col self-start rounded-[0.8rem] border-[0.1rem] border-gray-D px-[1.6rem] py-[1.6rem] sm:mb-[1.6rem] sm:flex-row sm:self-stretch'>
						<div className='mb-[2rem] grow sm:mb-0'>
							<p className='mb-[0.6rem] text-12-500 sm:mb-[0.4rem]'>담당자</p>
							{cardItem?.assignee ? (
								<div className='flex items-center gap-[0.8rem]'>
									<Avatar className='h-[2.4rem] w-[2.4rem]' name={cardItem.assignee.nickname} />
									<div>{cardItem.assignee.nickname}</div>
								</div>
							) : (
								<p className='text-black-4'> 지정된 담당자가 없습니다. </p>
							)}
						</div>
						<div className='grow'>
							<p className='mb-[0.6rem] text-12-500 sm:mb-[0.4rem]'>마감일</p>
							{cardItem?.dueDate ? (
								<p className='text-14-700'>{cardItem.dueDate}</p>
							) : (
								<p className='text-black-4'> 지정된 마감일이 없습니다. </p>
							)}
						</div>
					</div>
					<div className='basis-2/3'>
						<div className='mb-[1.6rem] flex'>
							<StatusChip className='flex-shrink-0' value={columnInfo.title} />
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
						<div>
							<p className='pb-[1rem] text-16-400 sm:pb-[0.8rem]'>댓글</p>
							<form className='relative' onSubmit={handleSubmit(onSubmit)}>
								<textarea
									{...register('content')}
									placeholder='댓글 작성하기'
									className='container h-[11rem] rounded-[0.6rem] border-[0.1rem] border-gray-D px-[1.6rem] py-[1.6rem] text-14-400 placeholder-gray-9 focus:border-violet-5 focus:outline-none focus:ring-0 sm:h-[7rem]'
								/>
								<button className='absolute bottom-[1.2rem] right-[1.2rem] rounded-[0.4rem] border-[0.1rem] border-gray-D bg-white px-[3.1rem] py-[0.9rem] text-12-400 text-violet-5 '>
									입력
								</button>
							</form>
						</div>
						{!!commentsList.length && (
							<div className='no-scrollbar mt-[2rem] h-[12.6rem] overflow-y-auto overflow-x-hidden'>
								{commentsList.map((commentItem) => {
									return (
										<div key={commentItem.id} className='mb-[2rem] flex gap-[1.4rem]'>
											<Avatar
												className='h-[3rem] w-[3rem] flex-shrink-0 sm:h-[2.2rem] sm:w-[2.2rem] '
												name={commentItem.author.nickname}
											/>
											<div>
												<div className='flex gap-[0.8rem]'>
													<p className='text-14-500 text-black-3'>{commentItem.author.nickname}</p>
													<div className='text-12-400 text-gray-9'>{commentItem.createdAt.slice(0, 16)}</div>
												</div>
												<div className='mb-[1.2rem] text-14-400 '>{commentItem.content}</div>
												<button className='mr-[1.2rem] text-12-400 text-gray-9 underline'>수정</button>
												<button className='text-12-400 text-gray-9 underline'>삭제</button>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}