import stringToNumber from '@/utils/stringToNumber';
import clsx from 'clsx';

interface AvatarProps {
	name: string;
	className: string;
	withBorder?: boolean;
}

export default function Avatar({ name, className, withBorder = false }: AvatarProps) {
	const pickerNumber = stringToNumber(name, 5);
	const MAPPER = ['bg-[#FFC85A]', 'bg-[#FDD446]', 'bg-[#9DD7ED]', 'bg-[#C4B1A2]', 'bg-[#A3C4A2]'];

	return (
		<div
			style={{ boxShadow: `${withBorder && '0 0 0 0.2rem white'}` }}
			className={clsx(
				className,
				MAPPER[pickerNumber],
				'text-montserrat flex shrink-0 items-center justify-center rounded-[50%] text-center text-12-600 text-white',
			)}
		>
			{name.toUpperCase().slice(0, 1)}
		</div>
	);
}
