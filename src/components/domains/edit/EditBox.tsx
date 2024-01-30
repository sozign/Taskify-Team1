import { useState } from 'react';
import ColorPick from '../../common/chips/ColorPick';
import { putDashboard } from '@/lib/api';
import { useRouter } from 'next/router';
import FormInput from '../../common/Input/FormInput';
import Button from '../../common/Buttons/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DashboardPost } from '@/constants/types';

function EditBox({ title = '비브리지', color = 'green' }: { title: string; color: string }) {
	const router = useRouter();
	const dashboardId = +(router.query.boardid ?? '');
	const [dashboardColor, setDashboardColor] = useState(color);
	const [value, setValue] = useState({
		title: '',
		color: '',
	});
	const [isDisabled, setIsDisabled] = useState(true);
	const RULES = {
		title: {
			onChange: () => setIsDisabled((prev) => !prev),
		},
	};
	const { control, getValues, handleSubmit } = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			title: title,
		},
	});
	interface FormValue {
		title: string;
	}

	const onSubmit = async () => {
		console.log();
		// 대시보드 수정 요청 보내기
		// const data = await putDashboard(dashboardId, value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mx-[2rem] flex flex-col sm:mx-[1.2rem]'>
			<div className='flex h-fit w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white px-[2.8rem] py-[2.9rem]'>
				<div className='flex justify-between'>
					<div className='w-fit text-20-700 text-black-3'>{title}</div>
					<ColorPick colorPick={dashboardColor} onClick={(pick: string) => setDashboardColor(pick)} />
				</div>
				<div className='mt-[3.4rem] flex h-fit flex-col justify-between sm:mt-[2.2rem]'>
					<FormInput<FormValue>
						label='대시보드 이름'
						name='title'
						control={control}
						rules={RULES.title}
						required={false}
					/>
					<div className='mt-[1.6rem] flex justify-end sm:mt-[0.8rem]'>
						<Button disabled={isDisabled} type='submit' color='violet' variant='confirm' className='cursor-pointer'>
							변경
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default EditBox;
