import { hoverCard } from '@/utils/framerAnimaition';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardLayoutProps {
	children: ReactNode;
}

export default function CardLayout({ children }: CardLayoutProps) {
	return (
		<motion.div
			whileHover='zoomedIn'
			variants={hoverCard}
			className='container rounded-[0.6rem] border-[0.1rem] border-gray-D bg-white px-[2rem] py-[2rem] sm:px-[1.2rem] sm:py-[1.2rem]'
		>
			{children}
		</motion.div>
	);
}
