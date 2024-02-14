import { montserrat } from '@/styles/font.js';
import stringToNumber from '@/utils/stringToNumber';
import clsx from 'clsx';
import Image from 'next/image';
interface AvatarProps {
	name: string;
	className: string;
	withBorder?: boolean;
	imageUrl?: string | null;
}

export default function Avatar({ name, className, withBorder = false, imageUrl = '' }: AvatarProps) {
	const pickerNumber = stringToNumber(name, 5);
	const MAPPER = ['bg-[#FFC85A]', 'bg-[#FDD446]', 'bg-[#9DD7ED]', 'bg-[#C4B1A2]', 'bg-[#A3C4A2]'];
	const isThereImage = !!imageUrl;
	return (
		<>
			{isThereImage ? (
				<Image className={clsx('rounded-[50%]', className)} src={imageUrl} width={32} height={32} alt='profile Image' />
			) : (
				<div
					style={{ boxShadow: `${withBorder && '0 0 0 0.2rem white'}` }}
					className={clsx(
						className,
						MAPPER[pickerNumber],
						montserrat.className,
						'flex items-center justify-center rounded-[50%] text-center text-12-600 text-white',
					)}
				>
					{name.toUpperCase().slice(0, 1)}
				</div>
			)}
		</>
	);
}
