import Image from 'next/image';
import { useState } from 'react';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import AddButton from '@/components/common/Buttons/AddButton';
import addIcon from '@/../../Public/assets/addIcon.svg';
import DashboardButton from '@/components/domains/myDashBoard/DashboardButton';
import PaginationButton from '@/components/domains/myDashBoard/PaginationButton';

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

	// const onSubmit = async () => {
	// 	if (getValues('dashboardName') && colorPick === '') {
	// 		const data = await postDashboard({ title: getValues('dashboardName'), color: colorPick });
	// 		console.log(data);
	// 	}
	// 	console.log({ title: getValues('dashboardName'), color: colorPick });
	// };

	return (
		<>
			<MyDashboardHeader title={'내 대시보드'} nickname={'nickname'} profileImageUrl={''} />
			<div className='flex'>
				<div className='sm:gap:-[2.4rem] flex h-[100%] w-[100%] flex-col  gap-[4rem] bg-gray-F  px-[4rem] py-[4rem] sm:gap-[2.4rem]'>
					<div className='flex h-[100%] w-[102.2rem] flex-col gap-[1.2rem] md:w-[50.4rem]  sm:w-[100%]'>
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
					</div>
					{/* <NotInvited /> */}
				</div>
			</div>
		</>
	);
}
