import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
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
import { postDashboard, getDashboards } from '@/lib/api';
import done from '@/../Public/assets/done.svg';
import { DashboardsGet, InvitationDashboardData } from '@/constants/types';
import PageLayout from '@/components/common/PageLayout';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import InvitationList from '@/components/domains/myDashBoard/InvitationList';

interface getDashboardsProps {
	page: number;
	cursorId: number;
	size: number;
	navigationMethod: 'infiniteScroll' | 'pagination';
}

export default function MyDashBoard() {
	const [addDashBoardModalOpen, setAddDashBoardModalOpen] = useState(false);
	const [colorPick, setColorPick] = useState('#7AC555');
	const [dashBoardData, setDashBoardData] = useState<DashboardsGet>();
	const [paginationPage, setPaginationPage] = useState<number>(1);
	const [invitationList, setInvitationList] = useState<InvitationDashboardData[]>([]);

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

	const dashboardLoad = async () => {
		const data = await getDashboards({ size: 5, cursorId: 0, page: paginationPage, navigationMethod: 'pagination' });
		setDashBoardData(data);
	};

	const onSubmit = async () => {
		if (getValues('dashboardName') && colorPick !== null) {
			await postDashboard({ title: getValues('dashboardName'), color: colorPick });
			setAddDashBoardModalOpen(false);
			dashboardLoad();
		}
	};

	const colorList: Record<string, string> = {
		green: '#7AC555',
		purple: '#760DDE',
		orange: '#FFA500',
		blue: '#76A6EA',
		pink: '#E876EA',
	};
	const colorNameList = Object.keys(colorList);

	useEffect(() => {
		dashboardLoad();
	}, [paginationPage]);

	return (
		<>
			<DashboardHeader dashboardId={0} nickname={'nickname'} profileImageUrl={''} title={'비브리지'} />
			<PageLayout>
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
							{dashBoardData?.dashboards.map((dashboard) => (
								<DashboardButton
									key={dashboard.id}
									color={dashboard.color}
									title={dashboard.title}
									createdByMe={dashboard.createdByMe}
									dashboardId={dashboard.id}
								/>
							))}
						</div>
						<PaginationButton
							totalCount={dashBoardData?.totalCount as string}
							paginationPage={paginationPage}
							setPaginationPage={setPaginationPage}
						/>
					</div>

					<InvitationList setInvitationList={setInvitationList} invitationList={invitationList} />
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
								{colorNameList.map((color) => (
									<div key={color} className='relative'>
										{colorList[color as string] === colorPick ? (
											<Image src={done} alt='체크 아이콘' className='absolute left-[0.3rem] top-[0.3rem] z-10' />
										) : null}
										<ColorChip key={color} color={color} onClick={() => setColorPick(colorList[color as string])} />
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
			</PageLayout>
		</>
	);
}
