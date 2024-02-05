import Image from 'next/image';

function ColorChip({ color, onClick }: { color: string; onClick: () => void }) {
	const colorPath = `/assets/chip/${color}.svg`;
	return (
		<>
			<div onClick={onClick} className=' h-[3rem] w-[3rem] sm:h-[2.8rem] sm:w-[2.8rem]'>
				<Image fill src={colorPath} alt={`${color}Chip 아이콘`} />
			</div>
		</>
	);
}

export default ColorChip;
