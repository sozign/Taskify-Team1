import { FormValue } from '@/pages/dashboard/[boardid]';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import TagChip from '../chips/TagChip';

interface TagInputProps {
	label: string;
	control: Control<FormValue, unknown>;
	className?: string;
}

/**
 * @todo
 * 1. 태그 최대 추가 갯수 제한
 * 2. overflow 처리
 * 3. string으로부터 hash 추출 후 랜덤한 배경색상 적용
 */

export default function TagInput({ label, control, className }: TagInputProps) {
	const {
		field: { value: tagList, onChange: changeTagList },
	} = useController({ name: 'tag', control, shouldUnregister: true });
	const [tagItem, setTagItem] = useState<string>('');

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter' && e.key !== 'Backspace') return;

		// 1 - 태그 추가
		if (e.key === 'Enter') {
			if (e.nativeEvent.isComposing) return; // 한글 입력이 완료되었는지
			if (!e.currentTarget.value) return;

			e.preventDefault();
			const tagItemToAdd = e.currentTarget.value.trim();
			const newTagSet = new Set([...tagList, tagItemToAdd]); // 중복 태그 방지
			const newTagList = Array.from(newTagSet);

			changeTagList(newTagList);
			setTagItem('');
		}

		// 2 - 태그 삭제
		if (e.key == 'Backspace') {
			if (e.currentTarget.value) return;
			if (!tagList?.length) return;

			e.preventDefault();
			const updatedTagList = [...tagList];
			updatedTagList.pop();
			changeTagList(updatedTagList);
		}
	};

	return (
		<div className={className}>
			<p className='text-18-500'>{label}</p>
			<div className='container mb-[0.8rem] mt-[1rem] flex h-[5rem] gap-[0.5rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0  focus:outline-violet-5'>
				{tagList && (
					<div className='flex gap-[0.4rem]'>
						{tagList.map((tagItem) => (
							<TagChip key={tagItem} text={tagItem} />
						))}
					</div>
				)}
				<input
					className='w-[9rem] placeholder:text-gray-D focus:outline-none'
					placeholder='입력 후 Enter'
					onChange={(e) => setTagItem(e.target.value)}
					onKeyDown={handleKeyDown}
					value={tagItem}
				/>
			</div>
		</div>
	);
}
