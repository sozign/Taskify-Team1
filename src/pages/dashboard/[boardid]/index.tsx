import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormInput from '@/components/common/Input/FormInput';
import Layout from '@/components/modal/Layout';
import { useState } from 'react';
import Button from '@/components/common/Buttons/Button';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
/**
 * @TODO
 * 이런 상수 값들 constants로 빼기
 */
const RULES = {
	title: {
		required: '필수값 입니다.',
		maxLength: { value: 20, message: '최대 20자를 넘을 수 없습니다.' },
	},
	description: {
		required: '필수값 입니다.',
		maxLength: { value: 20, message: '최대 20자를 넘을 수 없습니다.' },
	},
	dueDate: {
		min: { value: 18, message: '18 미만의 값을 입력할 수 없습니다.' },
		max: { value: 99, message: '99 초과의 값을 입력할 수 없습니다.' },
	},
};

interface FormValue {
	title: string;
	description: string;
}

export default function MyDashBoard() {
	const { control, handleSubmit } = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
		},
	});
	const onSubmit: SubmitHandler<FormValue> = (data) => console.log(data);

	const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);

	return (
		<>
			<DashboardHeader id={0} nickname={'nickname'} profileImageUrl={''} title={'비브리지'} />
			<button
				className='bg-violet-500 text-16-400'
				onClick={() => {
					setIsTaskEditModalOpen(true);
				}}
			>
				할 일 수정하기
			</button>

			<Layout $modalType='Modal' title='할 일 수정' isOpen={isTaskEditModalOpen} setOpen={setIsTaskEditModalOpen}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						shouldUnregister={true}
						name='title'
						control={control}
						rules={RULES.title}
						render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
							<FormInput
								ref={ref}
								value={value}
								onChange={onChange}
								required={!!('required' in RULES.title)}
								placeholder='제목을 입력해주세요'
								label='제목'
								errorMessage={error?.message}
							/>
						)}
					/>
					<Controller
						shouldUnregister={true}
						name='description'
						control={control}
						rules={RULES.description}
						render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
							<FormInput
								className='mt-[1rem]'
								ref={ref}
								value={value}
								onChange={onChange}
								errorMessage={error?.message}
								required={!!('required' in RULES.description)}
								placeholder='설명을 입력해주세요'
								label='설명'
							/>
						)}
					/>

					<div className='mt-[2.8rem] flex flex-row justify-end gap-[1.2rem]'>
						<Button
							onClick={() => {
								setIsTaskEditModalOpen(false);
							}}
							color='modalWhite'
							variant='modal'
						>
							취소
						</Button>
						<Button type='submit' color='modalViolet' variant='modal'>
							확인
						</Button>
					</div>
				</form>
			</Layout>
		</>
	);
}
