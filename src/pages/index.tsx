<<<<<<< HEAD
<<<<<<< HEAD
import LandingHeader from '@/components/common/Headers/LandingHeader';

export default function Home() {
	return (
		<div>
			<LandingHeader />
=======
import DropDownManager from '@/components/DropDownManager ';
=======
import DropDownManager from '@/components/DropDownManager';
>>>>>>> 22ec322 (FEAT : manager 드롭다운 / search  구현)
import Header from '@/components/common/Header';
export default function Home() {
	return (
		<div>
			<Header />
			<DropDownManager />
>>>>>>> 4f5f081 (CHORE : react-select 설치)
		</div>
	);
}
