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
			'rounded-[0.8rem] flex h-[25rem] w-[54rem] justify-center rounded-lg bg-white px-[2.8rem] py-[2.8rem] sm:h-[22rem] sm:w-[32.7rem]',
		Modal:
			'sm:mx-[2.4rem] rounded-[0.8rem] flex min-h-[22rem] h-fit w-[50.6rem] flex-col bg-white px-[2.8rem] pb-[2.8rem] pt-[3.2rem] sm:px-[2rem] sm:py-[2.8rem]',
		Task: 'rounded-[0.8rem] flex h-fit w-[73rem] flex-shrink-0 flex-col bg-white px-[2.8rem] py-[3.2rem] md:w-[68rem] sm:w-[32.7rem] sm:px-[2rem] sm:pb-[2.8rem] sm:pt-[1.4rem]',
	};

	return createPortal(
		<div
			className='overlay fixed left-0 top-0 z-MODALLAYOUT flex h-full w-full items-center justify-center bg-black-0/50'
			onClick={() => setOpen((prev) => !prev)}
		>
			<div
				className={`modal relative z-MODAL ${modalType[$modalType]}`}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{$modalType === 'Modal' && <p className='mb-[3.2rem] text-24-700 leading-[2.9rem] text-black-3'>{title}</p>}
				{children}
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLDivElement,
	);
}

export default Layout;
