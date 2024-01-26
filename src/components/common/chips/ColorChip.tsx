import Image from 'next/image';

function ColorChip({ color, size }: { color: string; size: number }) {
	return (
		<>
			<Image width={size} height={size} src={`assets/chip/${color}Chip.svg`} alt={`${color}Chip 아이콘`} />
		</>
	);
}

export default ColorChip;
