import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='overlay w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black-0/70'>
			{children}
		</div>
	);
}

export default Layout;
