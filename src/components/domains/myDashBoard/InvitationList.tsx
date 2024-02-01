import Button from '@/components/common/Buttons/Button';
import Image from 'next/image';
import searchIcon from '@../../../Public/assets/searchIcon.svg';
import { InvitationDashboardData } from '@/constants/types';
function InvitationList({
	onSearch,
	invitationList,
	setSearchKeyword,
}: {
	invitationList: InvitationDashboardData[];
	onSearch: (keyword: string) => void;
	setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<div className='flex h-[100%] w-[102.2rem] flex-col gap-[2rem] rounded-[0.8rem]  bg-white px-[2.8rem] py-[3.2rem] md:w-[50.4rem] sm:w-[100%] sm:px-[2.4rem] sm:py-[2.4rem]'>
			<h2 className='text-24-700 sm:text-20-600'>초대받은 대시보드</h2>
			<div className='relative'>
				<Image
					src={searchIcon}
					className='absolute left-[1.4rem] top-[23%] h-[2.4rem] w-[2.4rem] sm:h-[2.2rem] sm:w-[2.2rem]'
					alt='검색 아이콘'
				/>
				<input
					onChange={(e) => {
						onSearch(e.target.value);
						setSearchKeyword(e.target.value);
					}}
					placeholder='검색'
					className='w-[100%] rounded-[0.6rem] border border-gray-D px-[4.2rem] py-[1.1rem] text-14-500 sm:px-[4.4rem]'
				/>
			</div>

			<div>
				<div className='flex items-center justify-start gap-[26rem] py-[0.4rem] text-16-400 text-gray-9 md:gap-[6rem] sm:hidden'>
					<div className='mr-[10rem] md:mr-[9.2rem]'>이름</div>
					<div className=''>초대자</div>
					<div className=''>수락여부</div>
				</div>
				{invitationList.map((invitation) => (
					<div
						key={invitation.id}
						className=' sm: flex  items-center border-b py-[2rem] text-16-500 text-black-3 sm:flex-col  sm:items-start sm:py-[0]'
					>
						<div className=' flex w-[39.1rem] items-center justify-start md:w-[19rem] sm:mb-[1rem] sm:mt-[0.4rem]'>
							<span className='hidden text-14-500 text-gray-9 sm:mr-[2.8rem]  sm:block'>이름</span>
							{invitation.dashboard.title}
						</div>
						<div className='flex w-[30.8rem] md:w-[11.6rem] '>
							<span className='hidden text-14-500 text-gray-9 sm:mr-[1.3rem] sm:block'>초대자</span>
							{invitation.inviter.nickname}
						</div>
						<div className='flex gap-[1rem]  sm:py-[1.6rem]'>
							<Button variant='confirm' color='violet'>
								수락
							</Button>
							<Button variant='confirm' color='white'>
								거절
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default InvitationList;
