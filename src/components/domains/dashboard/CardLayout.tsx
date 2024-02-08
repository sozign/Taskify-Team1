import { ReactNode } from 'react';

interface CardLayoutProps {
	children: ReactNode;
}

export default function CardLayout({ children }: CardLayoutProps) {
	return (
		<div className='container rounded-[0.6rem] border-[0.1rem] border-gray-D bg-white px-[2rem] py-[2rem] hover:scale-104 sm:px-[1.2rem] sm:py-[1.2rem]'>
			{children}
		</div>
	);
}
