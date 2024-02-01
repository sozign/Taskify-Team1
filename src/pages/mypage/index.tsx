import DashboardHeader from '@/components/common/Headers/DashboardHeader';

export default function MyPage() {
	return (
		<div>
			<DashboardHeader dashboardId={0} nickname={'nickname'} profileImageUrl={''} title={'비브리지'} />내 정보 페이지
		</div>
	);
}
