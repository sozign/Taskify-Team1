import stringToNumber from '@/utils/stringToColor';
import clsx from 'clsx';

function TagChip({ text }: { text: string }) {
	const pickerNumber = stringToNumber(text); // 0 ~ 3까지의 수를 반환

	const MAPPER = [
		{ bg: 'bg-[#F9EEE3]', text: 'text-[#D58D49]' },
		{ bg: 'bg-[#E7F7DB]', text: 'text-[#86D549]' },
		{ bg: 'bg-[#F7DBF0]', text: 'text-[#D549B6]' },
		{ bg: 'bg-[#DBE6F7]', text: 'text-[#4981D5]' },
	];

	return (
		<div className={clsx('w-fit rounded-[0.4rem] px-[0.6rem] py-[0.4rem]', MAPPER[pickerNumber].bg)}>
			<p className={clsx(' text-center text-14-500 sm:text-12-500', MAPPER[pickerNumber].text)}>{text}</p>
		</div>
	);
}

export default TagChip;
