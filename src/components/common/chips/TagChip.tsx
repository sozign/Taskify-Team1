import clsx from 'clsx';

function TagChip({ text }: { text: string }) {
	/**
	 * @TODO text에서 hash값 추출, color 지정
	 * const hexaColor = stringToColor(text);
	 */
	const backgroundColor = `bg-gray-D`;
	const textColor = `text-red`;

	return (
		<div className={clsx('w-fit rounded-[0.4rem] px-[0.6rem] py-[0.4rem]', backgroundColor)}>
			<p className={clsx(' text-center text-14-500 sm:text-12-500', textColor)}>{text}</p>
		</div>
	);
}

export default TagChip;
