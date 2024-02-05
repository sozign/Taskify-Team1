import axios from 'axios';
import { InvitationDashboardData } from '../constants/types';

const invitationInstance = axios.create({
	baseURL: 'https://sp-taskify-api.vercel.app/2-1/',
	headers: {
		Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
	},
});

invitationInstance.interceptors.response.use((response) => {
	if (response?.data.invitations) {
		const uniqueDashboardIdsSet = new Set();
		const uniqueInvitations = response.data.invitations.filter((currentInvitation: InvitationDashboardData) => {
			const isDuplicate = uniqueDashboardIdsSet.has(currentInvitation.dashboard.id);
			if (!isDuplicate) {
				uniqueDashboardIdsSet.add(currentInvitation.dashboard.id);
			}
			return !isDuplicate;
		});

		response.data.invitations = uniqueInvitations;
	}
	return response;
});

export default invitationInstance;
