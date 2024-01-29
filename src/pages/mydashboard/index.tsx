import Image from 'next/image';
import { useState } from 'react';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import AddButton from '@/components/common/Buttons/addDashboardButton';
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
import NotInvited from '@/components/domains/myDashBoard/NotInvited';

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
		}
		console.log({ title: getValues('dashboardName'), color: colorPick });
	};

	return (
		<>
			<MyDashboardHeader title={'내 대시보드'} nickname={'nickname'} profileImageUrl={''} />
			<div className='flex '>
				<div className='sm:gap:-[2.4rem] flex w-[100%] flex-col  gap-[4rem] bg-gray-F  px-[4rem] py-[4rem] sm:gap-[2.4rem]'>
					<div className='flex w-[102.2rem] flex-col gap-[1.2rem] md:w-[50.4rem]  sm:w-[100%]'>
						<div className='col-span-2 grid grid-cols-3 gap-[1.2rem] md:col-span-3 md:grid-cols-2 md:gap-[1rem] sm:col-span-1 sm:grid-cols-1 sm:gap-[0.8rem]'>
							<AddButton
								onClick={() => {
									setAddDashBoardModalOpen(true);
								}}
							>
								<Image className='px-[0.6rem] py-[0.6rem]' fill src={addIcon} alt='추가하기 아이콘' />
							</AddButton>
							<DashboardButton color='green' title='비브리지' />
							<DashboardButton color='green' title='비브리지' />
							<DashboardButton color='green' title='비브리지' />
							<DashboardButton color='green' title='비브리지' />
							<DashboardButton color='green' title='비브리지' />
						</div>
						<PaginationButton />
					</div>

					<div className='flex h-[40rem] w-[102.2rem] flex-col gap-[6.6rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:gap-[10.5rem] sm:px-[2.4rem] sm:py-[2.4rem]'>
						<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
						<NotInvited />
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
