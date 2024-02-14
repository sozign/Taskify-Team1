import Image from 'next/image';

export interface getDashboardsProps {
	page: number;
	cursorId: number;
	size: number;
	navigationMethod: 'infiniteScroll' | 'pagination';
}

interface PageNationProps {
	page: number;
	totalCount: string;
}

function SideBarPagination({
	paginationInfo,
	setPaginationInfo,
}: {
	paginationInfo: PageNationProps;
	setPaginationInfo: React.Dispatch<React.SetStateAction<PageNationProps>>;
}) {
	const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.filter = 'invert(0%)';
	};

	const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.filter = 'invert(100%)';
	};

	const handlePreviousPage = () => {
		if (paginationInfo.page > 1) {
			setPaginationInfo((prevPaginationInfo: any) => ({
				...prevPaginationInfo,
				page: prevPaginationInfo.page - 1,
			}));
		}
	};

	const totalPages = Math.ceil(+paginationInfo.totalCount / 10);
	const handleNextPage = () => {
		if (paginationInfo.page < totalPages) {
			setPaginationInfo((prevPaginationInfo: any) => ({
				...prevPaginationInfo,
				page: prevPaginationInfo.page + 1,
			}));
		}
	};

	return (
		<div className='md: flex items-center justify-end gap-[1rem]'>
			<div className='md:text-10-500 text-14-500 text-black-3 md:hidden sm:hidden '>
				{totalPages} 페이지중 {paginationInfo.page}
			</div>
			<div className='flex items-center justify-center'>
				<button
					onClick={() => handlePreviousPage()}
					className='flex h-[4rem] w-[4rem] items-center justify-center  sm:h-[2.5rem] sm:w-[2.5rem]'
				>
					<Image
						width={14}
						height={14}
						onMouseEnter={handleHover}
						onMouseLeave={handleLeave}
						style={{ filter: 'invert(100%)' }}
						className='scale-x-[-1] transform'
						src='/assets/arrowIcon.svg'
						alt='화살표 아이콘'
					/>
				</button>
				<button
					onClick={() => handleNextPage()}
					className='flex h-[4rem]  w-[4rem] scale-x-[-1] transform items-center justify-center  sm:h-[2.5rem] sm:w-[2.5rem]'
				>
					<Image
						width={14}
						height={14}
						onMouseEnter={handleHover}
						onMouseLeave={handleLeave}
						style={{ filter: 'invert(100%)' }}
						className='scale-x-[-1] transform'
						src='/assets/arrowIcon.svg'
						alt='화살표 아이콘'
					/>
				</button>
			</div>
		</div>
	);
}

export default SideBarPagination;
