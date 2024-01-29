import { useForm, SubmitHandler, Controller, FieldErrors, Form } from 'react-hook-form';
import FormInput from '@/components/common/Input/FormInput';
import Layout from '@/components/modal/Layout';
import { useState } from 'react';
import Button from '@/components/common/Buttons/Button';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import PageLayout from '@/components/common/PageLayout';
import { useRouter } from 'next/router';
import TagInput from '@/components/common/Input/TagInput';

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

// 모달 1에서 폼으로 제출하는 값의 타입
export interface FormValue {
	title: string;
	description: string;
	date: Date;
	tag: string[];
}

export default function MyDashBoard() {
	const router = useRouter();
	const boardId = +(router.query?.boardid ?? '');

	// 모달 1 열림, 닫힘 제어
	const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);

	// 모달 1 폼 제출 관리
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
			date: undefined,
			tag: [],
		},
	});

	// 모달 1 폼 제출
	const onSubmit: SubmitHandler<FormValue> = (data) => console.log(data);

	// 모달 1 제출 가능 여부 관리
	const isNoError = (obj: FieldErrors<FormValue>) => Object.keys(obj).length === 0;

	return (
		<>
			<DashboardHeader id={0} nickname={'nickname'} profileImageUrl={''} title={'비브리지'} />
			<PageLayout boardId={boardId}>
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
							name='title'
							control={control}
							shouldUnregister={true}
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
							name='description'
							control={control}
							shouldUnregister={true}
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
						<Controller
							name='date'
							control={control}
							shouldUnregister={true}
							render={({ field: { ref, value, onChange } }) => (
								<>
									<p className='mt-[1rem] text-18-500'>마감일</p>
									<div className='container mb-[0.8rem] mt-[1rem] flex h-[5rem] flex-row gap-[1rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top  text-16-400  '>
										<Image
											className='h-auto w-auto'
											width={20}
											height={20}
											src='/assets/calender.svg'
											alt='캘린더 모양 아이콘'
										/>
										<DatePicker
											onKeyDown={(e) => {
												e.preventDefault(); // 수동 입력 방지
											}}
											dateFormat={'YYYY.MM.dd hh:mm'}
											showTimeSelect={true}
											ref={ref}
											selected={value}
											onChange={onChange}
											className='container placeholder:mt-0 placeholder:text-gray-D focus:outline-violet-5'
											wrapperClassName='container'
											calendarClassName='container'
											placeholderText='날짜를 입력해주세요'
										/>
									</div>
								</>
							)}
						/>
						<TagInput className='mt-[2rem]' control={control} label='태그' />

						<div className='mt-[2.8rem] flex flex-row justify-end gap-[1.2rem]'>
							<Button
								onClick={() => {
									setIsTaskEditModalOpen(false);
								}}
								color='modalWhite'
								disabled={false}
								variant='modal'
							>
								취소
							</Button>
							<Button disabled={!isNoError(errors)} type='submit' color='modalViolet' variant='modal'>
								확인
							</Button>
						</div>
					</form>
				</Layout>
			</PageLayout>
		</>
	);
}
