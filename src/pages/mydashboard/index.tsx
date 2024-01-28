import Image from 'next/image';
import { useState } from 'react';
import SideBar from '@/components/common/SideBar';
import FormInput from '../../components/common/Input/FormInput';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import AddButton from '@/components/common/Buttons/AddButton';
import Layout from '@/components/modal/Layout';
import Button from '@/components/common/Buttons/Button';
import addIcon from '@/../../Public/assets/addIcon.svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ColorChip from '@/components/common/chips/ColorChip';
import { postDashboard } from '@/lib/api';
import NotInvited from '@/components/common/domains/myDashBoard/NotInvited';
import DashboardButton from '@/components/common/Buttons/DashboardButton';

export default function MyDashBoard() {
	const [addDashBoardModalOpen, setAddDashBoardModalOpen] = useState(false);
	const [colorPick, setColorPick] = useState('');
	const [NewDashBoardInfo, setNNewDashBoardInfo] = useState<NewDashBoardInfo>({
		id: 0,
		title: '',
		color: '',
		createdAt: '',
		updatedAt: '',
		createdByMe: false,
		userId: 0,
	});

	const RULES = {
		dashboardName: {
			required: '생성할 대시보드 제목을 입력해주세요.',
		},
	};
	const { control, getValues } = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			dashboardName: '',
		},
	});

	interface FormValue {
		dashboardName: string;
	}

	interface NewDashBoardInfo {
		id: number;
		title: string;
		color: string;
		createdAt: string;
		updatedAt: string;
		createdByMe: boolean;
		userId: number;
	}

	const handelAddDashBoard = async () => {
		// if (getValues('dashboardName') && colorPick === '') {
		// 	const data = await postDashboard({ title: getValues('dashboardName'), color: colorPick });
		// 	console.log(data);
		// }
		console.log({ title: getValues('dashboardName'), color: colorPick });
	};

	const colorList = ['green', 'purple', 'orange', 'blue', 'pink'];

	return (
		<>
			<MyDashboardHeader title={'내 대시보드'} nickname={'nickname'} profileImageUrl={''} />
			<div className='sm:gap:-[2.4rem] flex h-[100] w-[100%] flex-col justify-start gap-[4rem] bg-gray-F  px-[4rem]  py-[4rem]'>
				<AddButton
					onClick={() => {
						setAddDashBoardModalOpen(true);
					}}
				>
					<Image className='px-[0.6rem] py-[0.6rem]' fill src={addIcon} alt='추가하기 아이콘' />
				</AddButton>
				<DashboardButton color='green' title='메롱' />
				<div className='flex h-[40rem] w-[102.2rem] flex-col gap-[6.6rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[100%] sm:gap-[10.5rem] sm:px-[2.4rem] sm:py-[2.4rem]'>
					<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
					<NotInvited />
				</div>
			</div>
			<Layout
				$modalType='Modal'
				title='새로운 대시보드'
				isOpen={addDashBoardModalOpen}
				setOpen={setAddDashBoardModalOpen}
			>
				<form onSubmit={handelAddDashBoard}>
					<div className=' flex flex-col justify-end gap-[1.2rem]'>
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
						<div className='flex gap-[1rem]'>
							{colorList.map((color) => (
								<ColorChip key={color} color={color} onClick={() => setColorPick(color)} />
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
