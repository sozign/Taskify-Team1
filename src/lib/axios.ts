import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://sp-taskify-api.vercel.app/2-1/',
});

export const authInstance = axios.create({
	baseURL: 'https://sp-taskify-api.vercel.app/2-1/',
	headers: {
		Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
	},
});
