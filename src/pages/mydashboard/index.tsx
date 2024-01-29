import Image from 'next/image';
import { useState } from 'react';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import AddDashboardButton from '@/components/common/Buttons/addDashboardButton';
import addIcon from '@/../../Public/assets/addIcon.svg';
import DashboardButton from '@/components/domains/myDashBoard/DashboardButton';
import PaginationButton from '@/components/domains/myDashBoard/PaginationButton';
import FormInput from '../../components/common/Input/FormInput';
import Layout from '@/components/modal/Layout';
import Button from '@/components/common/Buttons/Button';
import { useForm } from 'react-hook-form';
import ColorChip from '@/components/common/chips/ColorChip';
import { postDashboard } from '@/lib/api';
import done from '@/../Public/assets/done.svg';
import searchIcon from '@../../../Public/assets/searchIcon.svg';

export default function MyDashBoard() {
	const [addDashBoardModalOpen, setAddDashBoardModalOpen] = useState(false);
	const [colorPick, setColorPick] = useState('');
	const [NewDashBoardInfo, setNewDashBoardInfo] = useState<NewDashBoardInfo>({
		id: 0,
		title: '',
		color: '',
		createdAt: '',
		updatedAt: '',
		createdByMe: false,
		userId: 0,
	});

	interface NewDashBoardInfo {
		id: number;
		title: string;
		color: string;
		createdAt: string;
		updatedAt: string;
		createdByMe: boolean;
		userId: number;
	}

	const RULES = {
		dashboardName: {
			required: '생성할 대시보드 제목을 입력해주세요.',
		},
	};
	const { control, getValues, handleSubmit } = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			dashboardName: '',
		},
	});

	interface FormValue {
		dashboardName: string;
	}

	const colorList = ['green', 'purple', 'orange', 'blue', 'pink'];

	const onSubmit = async () => {
		if (getValues('dashboardName') && colorPick === '') {
			const data = await postDashboard({ title: getValues('dashboardName'), color: colorPick });
			setAddDashBoardModalOpen(false);
		}
	};

	return (
		<>
			<MyDashboardHeader title={'내 대시보드'} nickname={'nickname'} profileImageUrl={''} />
			<div className='flex '>
				<div className='sm:gap:-[2.4rem] flex w-[100%] flex-col  gap-[4rem] bg-gray-F  px-[4rem] py-[4rem] sm:gap-[2.4rem]'>
					<div className='flex w-[102.2rem] flex-col gap-[1.2rem] md:w-[50.4rem]  sm:w-[100%]'>
						<div className='col-span-2 grid grid-cols-3 gap-[1.2rem] md:col-span-3 md:grid-cols-2 md:gap-[1rem] sm:col-span-1 sm:grid-cols-1 sm:gap-[0.8rem]'>
							<AddDashboardButton
								onClick={() => {
									setAddDashBoardModalOpen(true);
								}}
							>
								<Image className='px-[0.6rem] py-[0.6rem]' fill src={addIcon} alt='추가하기 아이콘' />
							</AddDashboardButton>
							<DashboardButton color='green' title='비브리지' />
						</div>
						<PaginationButton />
					</div>

					<div className='flex h-[100%] w-[102.2rem] flex-col gap-[2rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:gap-[10.5rem] sm:px-[2.4rem] sm:py-[2.4rem]'>
						<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
						<div className='relative'>
							<Image
								src={searchIcon}
								className='absolute left-[1.4rem] top-[23%] h-[2.4rem] w-[2.4rem] sm:h-[2.2rem] sm:w-[2.2rem]'
								alt='검색 아이콘'
							/>
							<input
								placeholder='검색'
								className='w-[100%] rounded-[0.6rem] border border-gray-D px-[4.2rem] py-[1.1rem] text-14-500 sm:px-[4.4rem]'
							/>
						</div>
						<div className='mt-[0.4rem] flex items-center justify-start text-16-400 text-gray-9 '>
							<div className='mr-[6rem] flex-grow'>이름</div>
							<div className='flex-grow'>초대자</div>
							<div className='flex-grow'>수락여부</div>
						</div>

						<div className='flex items-center justify-around border-b py-[2.7rem] text-16-500 text-black-3'>
							<div className='flex-grow'>프로덕트 디자인</div>
							<div className='flex-grow'>손동희</div>
							<div className='flex flex-grow gap-[1rem]'>
								<Button variant='confirm' color='violet'>
									수락
								</Button>
								<Button variant='confirm' color='white'>
									거절
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 대시보드 추가 모달 */}
			<Layout
				$modalType='Modal'
				title='새로운 대시보드'
				isOpen={addDashBoardModalOpen}
				setOpen={setAddDashBoardModalOpen}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className=' flex flex-col justify-end gap-[1.2rem]'>
						<FormInput<FormValue>
							label='대시보드 이름'
							name='dashboardName'
							control={control}
							rules={RULES.dashboardName}
							required={!!('required' in RULES.dashboardName)}
						/>
						<div className='flex gap-[1rem]'>
							{colorList.map((color) => (
								<div key={color} className='relative'>
									{color === colorPick ? (
										<Image src={done} alt='체크 아이콘' className='absolute left-[0.3rem] top-[0.3rem] z-10' />
									) : null}
									<ColorChip key={color} color={color} onClick={() => setColorPick(color)} />
								</div>
							))}
						</div>
						<div className='flex justify-end gap-[1.2rem]'>
							<Button
								onClick={() => {
									setAddDashBoardModalOpen(false);
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
					</div>
				</form>
			</Layout>
		</>
	);
}
