import addBox from '@/../public/assets/addBox.svg';
import InviteModal from '@/components/modal/InviteModal';
import { InvitationsDashboardGet } from '@/constants/types';
import { getInvitationsDashboardProps } from '@/lib/api';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import EditPaginationButton from './EditPaginationButton';
import Invitation from './Invitation';
import notInvited from '@/../../public/assets/notInvited.svg';
interface InvitationsBoxProps {
	dashboardId: number;
	invitations: InvitationsDashboardGet;
	paginationInfo: getInvitationsDashboardProps;
	setPaginationInfo: Dispatch<SetStateAction<getInvitationsDashboardProps>>;
}

function InvitationsBox({ dashboardId, invitations, paginationInfo, setPaginationInfo }: InvitationsBoxProps) {
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

	return (
		<>
			<div className='mx-[2rem] flex h-fit min-h-[47.7rem] w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white p-[2.8rem] pb-[2rem] sm:mx-[1.2rem] sm:min-h-[40.6rem]'>
				<div className='mb-[2.7rem] flex items-center justify-between'>
					<span className='text-24-700 text-black-3 sm:text-20-700'>초대 내역</span>
					<div className='flex items-center gap-[1.6rem] sm:flex-col sm:items-end'>
						{invitations.totalCount > 5 ? (
							<div className='flex'>
								<EditPaginationButton
									paginationInfo={paginationInfo}
									setPaginationInfo={setPaginationInfo}
									totalCount={invitations.totalCount}
								/>
							</div>
						) : null}
						<button
							onClick={() => setIsInviteModalOpen((prev) => !prev)}
							className='flex h-[3.2rem] w-[10.5rem] items-center justify-center rounded-md bg-violet-5 px-[1.6rem] py-[0.8rem]'
						>
							<div className='flex h-fit flex-shrink-0 gap-[0.8rem] text-14-500 text-white'>
								<Image src={addBox} width={16} height={16} alt='초대하기 버튼 이미지' />
								초대하기
							</div>
						</button>
					</div>
				</div>
				{invitations.totalCount !== 0 ? (
					<>
						<div className='mb-[2.4rem] text-16-400 text-gray-9 sm:mb-[2rem] sm:text-14-400'>이메일</div>
						<div>
							{invitations.invitations.map((invitation, index) => (
								<>
									<Invitation key={invitation.id} dashboardId={dashboardId} invitationData={invitation} />
									{(index + 1) % 5 !== 0 && <div className='mb-[1.5rem] mt-[1.6rem] border border-t-0 border-gray-E' />}
								</>
							))}
						</div>
					</>
				) : (
					<div className='flex h-[31.8rem] flex-col items-center justify-center gap-[2.4rem] sm:h-[29.8rem]'>
						<Image src={notInvited} alt='아직 초대한 멤버가 없을 때' />
						<span className='text-18-400 text-gray-9'>아직 초대한 멤버가 없어요.</span>
					</div>
				)}
			</div>
			<InviteModal isOpen={isInviteModalOpen} setIsOpen={setIsInviteModalOpen} dashboardId={dashboardId} />
		</>
	);
}

export default InvitationsBox;
