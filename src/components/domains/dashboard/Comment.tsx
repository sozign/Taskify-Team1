import Avatar from '@/components/common/Avatar';
import { CommentData } from '@/constants/types';
import { useUserContext } from '@/context/UserContext';
import { putComment } from '@/lib/api';
import { useRef, useState } from 'react';

export default function Comment({ commentItem }: { commentItem: CommentData }) {
	const {
		value: { userInfo },
	} = useUserContext();
	const isEditable = useRef<boolean>(commentItem.author.id === userInfo?.id);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [commentToPut, setCommentToPut] = useState<string>(commentItem.content);

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
				{isEditMode ? (
					<textarea
						className='block h-[4rem] w-full p-[0.5rem] text-14-400 focus:outline-violet-5'
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
					disabled={!isEditable.current}
				>
					수정
				</button>
				<button className='text-12-400 text-gray-9 underline' disabled={!isEditable.current}>
					삭제
				</button>
			</div>
		</div>
	);
}
