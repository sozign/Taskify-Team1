import { DashBoardContextProvider } from '@/context/DashboardContext';
import { UserContextProvider } from '@/context/UserContext';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<DashBoardContextProvider>
				<Component {...pageProps} />
			</DashBoardContextProvider>
		</UserContextProvider>
	);
}
