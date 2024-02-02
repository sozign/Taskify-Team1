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

// image 업로드 시 사용하는 instance
export const authInstanceWithMedia = axios.create({
	baseURL: 'https://sp-taskify-api.vercel.app/2-1/',
	headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
	},
});
