import Image from 'next/image';

function ColorChip({ color, onClick }: { color: string; onClick: () => void }) {
	return (
		<>
			<div onClick={onClick} className='relative h-[3rem] w-[3rem] sm:h-[2.8rem] sm:w-[2.8rem]'>
				<Image fill src={`/assets/chip/${color}Chip.png`} alt={`${color}Chip 아이콘`} />
			</div>
		</>
	);
}

export default ColorChip;
