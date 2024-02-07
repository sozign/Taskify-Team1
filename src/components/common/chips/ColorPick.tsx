import Image from 'next/image';
import ColorChip from './ColorChip';

function ColorPick({ colorPick, onClick }: { colorPick: string; onClick: (pick: string) => void }) {
	const colorList: Record<string, string> = {
		green: '#7AC555',
		purple: '#760DDE',
		orange: '#FFA500',
		blue: '#76A6EA',
		pink: '#E876EA',
	};

	const colorNameList = Object.keys(colorList);

	return (
		<div className='flex gap-[1rem]'>
			{colorNameList.map((color) => (
				<div key={color} className='relative'>
					{color === colorPick ? (
						<Image
							src={'/assets/done.svg'}
							width={24}
							height={24}
							alt='체크 아이콘'
							className='absolute left-[0.3rem] top-[0.3rem] z-10'
						/>
					) : null}
					<ColorChip color={color} onClick={() => onClick(color)} />
				</div>
			))}
		</div>
	);
}

export default ColorPick;
