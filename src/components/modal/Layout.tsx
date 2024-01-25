import { Dispatch, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

interface LayoutProps {
	children: ReactNode;
	$modalType: 'Alert' | 'Modal' | 'Task';
	title?: string;
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
function Layout({ children, $modalType, title, isOpen, setOpen }: LayoutProps) {
	if (!isOpen) return null;
	const modalType = {
		Alert:
			'rounded-[0.8rem] flex h-[25rem] w-[54rem] justify-center rounded-lg bg-white px-[2.8rem] pt-[10.8rem] sm:h-[22rem] sm:w-[32.7rem] sm:pt-[8.1rem]',
		Modal:
			'rounded-[0.8rem] flex min-h-[22rem] h-fit w-[54rem] flex-col bg-white px-[2.8rem] pb-[2.8rem] pt-[3.2rem] sm:px-[2rem] sm:py-[2.8rem]',
		Task: 'rounded-[0.8rem] flex h-fit w-[73rem] flex-shrink-0 flex-col bg-white px-[2.8rem] py-[3.2rem] md:h-[77rem] md:w-[68rem] sm:h-[70.8rem] sm:w-[32.7rem] sm:px-[4rem] sm:pb-[2.8rem] sm:pt-[4rem]',
	};

	return createPortal(
		<div
			className='overlay fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black-0/70'
			onClick={() => setOpen((prev) => !prev)}
		>
			<div
				className={`modal relative z-10 ${modalType[$modalType]}`}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{$modalType === 'Modal' && <p className='mb-[3.2rem] text-24-700 text-black-3'>{title}</p>}
				{children}
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLDivElement,
	);
}

export default Layout;
