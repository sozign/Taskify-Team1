// import { useEffect, useState } from 'react';
// import SideBar from './SideBar';

// export default function PageLayout({ children }: { children: React.ReactNode }) {
// 	const [isResizing, setIsResizing] = useState(false);
// 	const [initialX, setInitialX] = useState(0);
// 	const [width, setWidth] = useState(160); //px

// 	const handleMouseDown = (e: React.MouseEvent) => {
// 		e.preventDefault();
// 		setIsResizing(true);
// 		setInitialX(e.clientX);
// 	};

// 	const handleMouseUp = () => {
// 		setIsResizing(false);
// 	};

// 	const handleMouseMove = (e: MouseEvent) => {
// 		if (isResizing) {
// 			const newWidth = width + e.clientX - initialX;
// 			setInitialX(e.clientX);
// 			if (newWidth >= 67 && newWidth <= 300) {
// 				setWidth(newWidth);
// 			}
// 		}
// 	};

// 	// 추가된 코드
// 	useEffect(() => {
// 		if (isResizing) {
// 			document.addEventListener('mousemove', handleMouseMove);
// 			document.addEventListener('mouseup', handleMouseUp);
// 		} else {
// 			document.removeEventListener('mousemove', handleMouseMove);
// 			document.removeEventListener('mouseup', handleMouseUp);
// 		}

// 		return () => {
// 			document.removeEventListener('mousemove', handleMouseMove);
// 			document.removeEventListener('mouseup', handleMouseUp);
// 		};
// 	}, [isResizing]);

// 	return (
// 		<div className='flex h-[100vh]'>
// 			<div className='h-full' style={{ width }}>
// 				<SideBar />
// 			</div>
// 			<div className='h-full w-[0.6rem] cursor-col-resize hover:bg-gray-D' onMouseDown={handleMouseDown} />
// 			<div className='h-full'>{children}</div>
// 		</div>
// 	);
// }

import SideBar from './SideBar';

interface PageLayoutProps {
	boardId?: number;
	children: React.ReactNode;
}

export default function PageLayout({ children, boardId }: PageLayoutProps) {
	return (
		<div className='flex h-[100vh]'>
			<div className='h-full w-[30rem] bg-white md:w-[16rem] sm:w-[6.7rem]'>
				<SideBar boardId={boardId} />
			</div>
			<div className='h-full w-full'>{children}</div>
		</div>
	);
}
