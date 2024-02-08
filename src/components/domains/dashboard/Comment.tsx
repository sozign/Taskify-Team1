import Avatar from '@/components/common/Avatar';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { CommentData } from '@/constants/types';
import { useUserContext } from '@/context/UserContext';
import { deleteComment, putComment } from '@/lib/api';
import { useState } from 'react';

export default function Comment({ commentItem }: { commentItem: CommentData }) {
	const {
		value: { userInfo },
	} = useUserContext();

	const isEditable = commentItem.author.id === userInfo?.id;

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [commentToPut, setCommentToPut] = useState<string>(commentItem.content);

	const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

	return (
		<>
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
					{isEditMode ? (
						<textarea
							className='my-[0.3rem] block h-[4rem] w-full rounded-[0.6rem] p-[0.5rem] text-14-400 focus:outline-violet-5'
							value={commentToPut}
							onChange={(e) => setCommentToPut(e.target.value)}
							placeholder='댓글수정'
						/>
					) : (
						<div className='mb-[1.2rem] text-14-400 '>{commentToPut}</div>
					)}
					<button
						onClick={async () => {
							if (!isEditMode) {
								setIsEditMode((prevMode) => !prevMode);
							} else {
								await putComment(commentItem.id, commentToPut);
								setIsEditMode((prevMode) => !prevMode);
							}
						}}
						className='mr-[1.2rem] text-12-400 text-gray-9 underline'
						disabled={!isEditable}
					>
						수정
					</button>
					<button
						onClick={() => {
							setIsConfirmOpen(true);
						}}
						className='text-12-400 text-gray-9 underline'
						disabled={!isEditable}
					>
						삭제
					</button>
				</div>
			</div>
			<ConfirmModal
				request={deleteComment}
				id={commentItem.id}
				isOpen={isConfirmOpen}
				setOpen={setIsConfirmOpen}
				content='댓글을 삭제하시겠습니까?'
			/>
		</>
	);
}
