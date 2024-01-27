import React from 'react';
import ColorChip from './ColorChip';
import Image from 'next/image';
import done from '../../../../Public/assets/done.svg';

function ColorPick({ pick }: { pick: string }) {
	const colors = ['green', 'violet', 'orange', 'blue', 'pink'];
	return (
		<div className='flex gap-[1rem]'>
			{colors.map((color) => (
				<div key={color} className='relative'>
					{color === pick ? (
						<Image src={done} alt='선택한 색상' className='absolute left-[0.3rem] top-[0.3rem] z-10' />
					) : null}
					<ColorChip color={color} />
				</div>
			))}
		</div>
	);
}

export default ColorPick;
