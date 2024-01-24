import React, { ReactNode } from 'react';

function Layout({
	children,
	$modalType,
	primaryButton = null,
	secondaryButton = null,
}: {
	children: ReactNode;
	$modalType: 'Alert' | 'Modal' | 'Task';
	primaryButton?: '확인' | '생성' | '변경' | '삭제' | null;
	secondaryButton?: '취소' | null;
}) {
	const modalType = {
		Alert: 'flex h-[25rem] w-[54rem] items-center justify-center rounded-lg bg-white px-[2.8rem] py-[2.8rem]',
		Modal: 'flex min-h-[22rem] min-w-[32.7rem] h-fit w-fit flex-col bg-white px-[2.8rem] pb-[2.8rem] pt-[3.2rem]',
		Task: 'flex h-[76.3rem] w-[73rem] flex-shrink-0 flex-col bg-white px-[2.8rem] py-[3.2rem]',
	};

	return (
		<div className='overlay fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black-0/70'>
			<div className={`modal relative z-10 ${modalType[$modalType]}`}>
				{children}
				<div className={`buttonBox absolute bottom-[2.8rem] right-[2.8rem] flex flex-row-reverse gap-[1.2rem]`}>
					{primaryButton ? <button>{primaryButton}</button> : primaryButton}
					{secondaryButton ? <button>{secondaryButton}</button> : secondaryButton}
				</div>
			</div>
		</div>
	);
}

export default Layout;
