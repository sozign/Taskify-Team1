import { DashBoardContextProvider } from '@/context/DashboardContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<DashBoardContextProvider>
			<Component {...pageProps} />
		</DashBoardContextProvider>
	);
}
