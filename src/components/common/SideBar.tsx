import mockdata from '@/constants/mock.json';
import TaskifyImage from '@/../../Public/assets/TaskifyImage.svg';
import Taskify from '@/../../Public/assets/Taskify.svg';
import RoyalCrownIcon from '@/../../Public/assets/royalCrownIcon.svg';
import PlusIcon from '@/../../Public/assets/PlusIcon.svg';
import CheckedIcon from '@/../../Public/assets/checked.svg';

import clsx from 'clsx';
import Link from 'next/link';

import Image from 'next/image';
import Layout from '../modal/Layout';
import Button from './Buttons/Button';
import { useState } from 'react';
import FormInput from './Input/FormInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface SideBarProps {
	boardId?: number;
}

export default function SideBar({ boardId }: SideBarProps) {
	// 대시보드 생성 모달 폼 관련 타입/상수 관리
	const RULES = {
		dashboardName: {
			required: '생성할 대시보드 제목을 입력해주세요.',
		},
	};

	interface FormValue {
		dashboardName: string;
		selectedColor: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
	}

	// 대시보드 생성 모달 여닫음 관리
	const [isMakeNewDashBoardModalOpen, setMakeNewDashBoardModalOpen] = useState<boolean>(false);

	// 대시보드 생성 모달 폼 관리
	const {
		control,
		handleSubmit,
		// formState: { errors },
	} = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			dashboardName: '',
			selectedColor: 'green',
		},
	});

	// 대시보드 생성 모달 제출
	const onSubmit: SubmitHandler<FormValue> = (data) => console.log(data);

	const COLOR_PICK: Record<string, string> = {
		green: 'bg-green',
		purple: 'bg-purple',
		orange: 'bg-orange',
		blue: 'bg-blue',
		pink: 'bg-pink',
	};

	return (
		<>
			<div className='h-full w-full border-r border-gray-D p-[1.2rem]'>
				<div className='mb-[4.4rem] mt-[0.8rem] flex justify-start p-[1.2rem]'>
					<Image alt='로고' src={TaskifyImage} />
					<Image alt='폰트 로고' className='sm:hidden' width={80} height={22} src={Taskify} />
				</div>
				<div className=' p-[1.2rem]'>
					<button
						className='flex w-full flex-row items-center justify-between'
						onClick={() => {
							setMakeNewDashBoardModalOpen(true);
						}}
					>
						<div className='text-12-700 text-gray-7 sm:hidden'>Dash Boards</div>
						<Image alt='대시보드 추가 버튼 아이콘' width={20} height={20} src={PlusIcon} />
					</button>
				</div>
				<div>
					{mockdata.dashboards.map((dashBoardItem) => {
						return (
							<Link key={dashBoardItem.id} href={`/dashboard/${dashBoardItem.id}`}>
								<div
									className={clsx(
										'flex items-center justify-start gap-[0.6rem] rounded-[0.4rem] p-[1.2rem] sm:pl-[1.7rem]',
										boardId === dashBoardItem.id && 'bg-violet-F',
									)}
								>
									<div className={clsx(COLOR_PICK[dashBoardItem.color], 'h-[0.8rem] w-[0.8rem] rounded-[50%] ')} />
									<div className='text-18-500 text-gray-7 sm:hidden sm:text-16-500'>{dashBoardItem.title}</div>
									{dashBoardItem.createdByMe && (
										<Image
											alt='내가 만든 대시보드에 붙는 왕관모양 아이콘'
											className='sm:hidden'
											height={14}
											src={RoyalCrownIcon}
										/>
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</div>

			{/* 대시보드 생성 모달  */}
			<Layout
				$modalType='Modal'
				title='새로운 대시보드'
				isOpen={isMakeNewDashBoardModalOpen}
				setOpen={setMakeNewDashBoardModalOpen}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						shouldUnregister={true}
						name='dashboardName'
						control={control}
						rules={RULES.dashboardName}
						render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
							<FormInput
								ref={ref}
								value={value}
								onChange={onChange}
								required={!!('required' in RULES.dashboardName)}
								placeholder='대시보드 이름을 입력해주세요'
								label='대시보드 이름'
								errorMessage={error?.message}
							/>
						)}
					/>
					<Controller
						shouldUnregister={true}
						control={control}
						name='selectedColor'
						render={({ field }) => {
							return (
								<div className='mt-[2.8rem] flex gap-[1rem]'>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-green'>
										<input className=' opacity-0 ' type='radio' {...field} value='green' />
										{field.value === 'green' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-purple'>
										<input className=' opacity-0 ' type='radio' {...field} value='purple' />
										{field.value === 'purple' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-orange'>
										<input className=' opacity-0 ' type='radio' {...field} value='orange' />
										{field.value === 'orange' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-blue'>
										<input className=' opacity-0 ' type='radio' {...field} value='blue' />
										{field.value === 'blue' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-pink'>
										<input className=' opacity-0 ' type='radio' {...field} value='pink' />
										{field.value === 'pink' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
								</div>
							);
						}}
					/>
					<div className='mt-[2.8rem] flex justify-end gap-[1.2rem]'>
						<Button
							onClick={() => {
								setMakeNewDashBoardModalOpen(false);
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
		</>
	);
}
