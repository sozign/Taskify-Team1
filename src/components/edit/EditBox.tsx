import { useState } from 'react';
import ColorPick from '../common/chips/ColorPick';
import { putDashboard } from '@/lib/api';
import { useRouter } from 'next/router';
import FormInput from '../common/Input/FormInput';
import Button from '../common/Buttons/Button';

function EditBox({ title = '비브리지', color = 'green' }: { title: string; color: string }) {
	const router = useRouter();
	const dashboardId = +(router.query.boardid ?? '');

	const [value, setValue] = useState({
		title: '',
		color: '',
	});

	async function handleSubmit() {
		const data = await putDashboard(dashboardId, value);
	}

	return (
		<form onSubmit={handleSubmit} className='m-[2rem] mt-0 flex flex-col'>
			<div className='flex h-[25.6rem] w-[62.5rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white px-[2.8rem] py-[2.9rem]'>
				<div className='flex justify-between'>
					<div className='w-fit text-20-700 text-black-3'>{title}</div>
					<ColorPick pick={color} />
				</div>
				<div className='mt-[3.4rem] flex h-fit flex-col justify-between'>
					<FormInput required={false} label='대시보드 이름' placeholder={title}></FormInput>
					<div className='mt-[1.6rem] flex justify-end'>
						<Button color='violet' variant='confirm' className=''>
							변경
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default EditBox;
