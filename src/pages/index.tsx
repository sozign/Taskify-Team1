import AuthButton from '@/components/common/Buttons/AuthButton';
import Header from '@/components/common/Header';

export default function Home() {
	return (
		<div>
			<Header />
			<AuthButton>로그인</AuthButton>
		</div>
	);
}
