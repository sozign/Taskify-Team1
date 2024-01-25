import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
	$modalType: 'Alert' | 'Modal' | 'Task';
}

function Layout({ children, $modalType }: LayoutProps) {
	const modalType = {
		Alert:
			'flex h-[25rem] w-[54rem] items-center justify-center rounded-lg bg-white px-[2.8rem] py-[2.8rem] sm:h-[22rem] sm:w-[32.7rem]',
		Modal:
			'flex min-h-[22rem] h-fit w-[54rem] flex-col bg-white px-[2.8rem] pb-[2.8rem] pt-[3.2rem] sm:px-[2rem] sm:py-[2.8rem]',
		Task: 'flex h-fit w-[73rem] flex-shrink-0 flex-col bg-white px-[2.8rem] py-[3.2rem] md:h-[77rem] md:w-[68rem] sm:h-[70.8rem] sm:w-[32.7rem] sm:px-[4rem] sm:pb-[2.8rem] sm:pt-[4rem]',
	};

	return (
		<div className='overlay fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black-0/70'>
			<div className={`modal relative z-10 ${modalType[$modalType]}`}>{children}</div>
		</div>
	);
}

export default Layout;
