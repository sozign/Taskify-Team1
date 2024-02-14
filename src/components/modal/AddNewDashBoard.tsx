import Layout from '../modal/Layout';
import Button from '../common/Buttons/Button';
import FormInput from '../common/Input/FormInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import router from 'next/router';
import { postDashboard } from '@/lib/api';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export const COLOR_PICK: Record<string, string> = {
	'#7AC555': 'bg-green',
	'#760DDE': 'bg-purple',
	'#FFA500': 'bg-orange',
	'#76A6EA': 'bg-blue',
	'#E876EA': 'bg-pink',
};

interface AddNewDashBoardProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewDashBoard({ isOpen, setOpen }: AddNewDashBoardProps) {
	// 대시보드 생성 모달 폼 관련 타입/상수 관리
	const RULES = {
		dashboardName: {
			required: '생성할 대시보드 제목을 입력해주세요.',
		},
	};

	interface FormValue {
		title: string;
		color: '#7AC555' | '#760DDE' | '#FFA500' | '#76A6EA' | '#E876EA';
	}

	// 대시보드 생성 모달 폼 관리
	const {
		control,
		handleSubmit,
		// formState: { errors },
	} = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			color: '#7AC555',
		},
	});

	// 대시보드 생성 모달 제출
	const onSubmit: SubmitHandler<FormValue> = async (data) => {
		const res = await postDashboard(data);
		setOpen(false);

		router.reload();
		router.push(`/dashboard/${res.id}`);
	};

	return (
		<Layout $modalType='Modal' title='새로운 대시보드' isOpen={isOpen} setOpen={setOpen}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput<FormValue>
					label='대시보드 이름'
					name='title'
					control={control}
					rules={RULES.dashboardName}
					required={!!('required' in RULES.dashboardName)}
				/>
				<Controller
					shouldUnregister={true}
					control={control}
					name='color'
					render={({ field }) => {
						return (
							<div className='mt-[2.8rem] flex gap-[1rem]'>
								<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-green'>
									<input className=' opacity-0 ' type='radio' {...field} value='#7AC555' />
									{field.value === '#7AC555' && (
										<Image
											src='/assets/checked.svg'
											alt='Check Icon'
											className='absolute right-[0.3rem] top-[0.3rem]'
										/>
									)}
								</label>
								<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-purple'>
									<input className=' opacity-0 ' type='radio' {...field} value='#760DDE' />
									{field.value === '#760DDE' && (
										<Image
											src='/assets/checked.svg'
											alt='Check Icon'
											className='absolute right-[0.3rem] top-[0.3rem]'
										/>
									)}
								</label>
								<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-orange'>
									<input className=' opacity-0 ' type='radio' {...field} value='#FFA500' />
									{field.value === '#FFA500' && (
										<Image
											src='/assets/checked.svg'
											alt='Check Icon'
											className='absolute right-[0.3rem] top-[0.3rem]'
										/>
									)}
								</label>
								<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-blue'>
									<input className=' opacity-0 ' type='radio' {...field} value='#76A6EA' />
									{field.value === '#76A6EA' && (
										<Image
											src='/assets/checked.svg'
											alt='Check Icon'
											className='absolute right-[0.3rem] top-[0.3rem]'
										/>
									)}
								</label>
								<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-pink'>
									<input className=' opacity-0 ' type='radio' {...field} value='#E876EA' />
									{field.value === '#E876EA' && (
										<Image
											src='/assets/checked.svg'
											alt='Check Icon'
											className='absolute right-[0.3rem] top-[0.3rem]'
										/>
									)}
								</label>
							</div>
						);
					}}
				/>
				<div className='mt-[2.8rem] flex justify-end gap-[1.2rem]'>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						color='modalWhite'
						disabled={false}
						variant='modal'
					>
						취소
					</Button>
					<Button disabled={false} type='submit' color='modalViolet' variant='modal'>
						확인
					</Button>
				</div>
			</form>
		</Layout>
	);
}
