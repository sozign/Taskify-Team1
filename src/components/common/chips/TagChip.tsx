import stringToNumber from '@/utils/stringToColor';
import clsx from 'clsx';

function TagChip({ text }: { text: string }) {
	const pickerNumber = stringToNumber(text, 4); // string을 4가지 경우로 매핑

	const MAPPER = [
		{ bg: 'bg-[#F9EEE3]', text: 'text-[#D58D49]' },
		{ bg: 'bg-[#E7F7DB]', text: 'text-[#86D549]' },
		{ bg: 'bg-[#F7DBF0]', text: 'text-[#D549B6]' },
		{ bg: 'bg-[#DBE6F7]', text: 'text-[#4981D5]' },
	];

	return (
		<div className={clsx('w-fit rounded-[0.4rem] px-[0.6rem] py-[0.4rem]', MAPPER[pickerNumber].bg)}>
			<p className={clsx('text-center text-12-500 leading-[1.4rem] sm:text-12-500', MAPPER[pickerNumber].text)}>
				{text}
			</p>
		</div>
	);
}

export default TagChip;
