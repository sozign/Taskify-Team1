import Image from 'next/image';
import React from 'react';
import arrowLeft from '@/../Public/assets/arrowLeft.svg';
import arrowRight from '@/../Public/assets/arrowRight.svg';
import Button from '../common/Buttons/Button';

function InviteListBox() {
	const a = 3;
	return (
		<div className='ml-[2rem] flex h-[47.7rem] w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white p-[2.8rem] pb-[2rem]'>
			<div className='mb-[2.7rem] flex items-center justify-between'>
				<span className='text-24-700 text-black-3'>초대 내역</span>
				<div className='flex items-center gap-[1.6rem]'>
					{a === 3 ? (
						<div className='flex gap-[1.6rem]'>
							<div className='flex items-center text-14-400 text-black-3'>{`2 페이지 중 1`}</div>
							<div className='flex'>
								<button className='flex h-[4rem] w-[4rem] items-center justify-center rounded-bl rounded-tl border border-gray-D'>
									<Image src={arrowLeft} alt='초대 목록 이전 페이지' width={16} height={16} />
								</button>
								<button className='flex h-[4rem] w-[4rem] items-center justify-center rounded-bl rounded-tl border border-gray-D'>
									<Image src={arrowRight} alt='초대 목록 다음 페이지' width={16} height={16} />
								</button>
							</div>
						</div>
					) : null}
					<Button color='violet' variant='confirm'>
						+ 초대하기
					</Button>
				</div>
			</div>
		</div>
	);
}

export default InviteListBox;
