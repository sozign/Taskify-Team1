import { CardItemGet, CardItemPost, CardList, UserInfo } from '@/constants/types';
import { authInstance as authAxios, instance as axios } from './axios';

//===============================
//============Auth===============
//===============================
/**
 * 로그인
 */
interface postAuthLoginProps {
	email: string;
	password: string;
}
export async function postAuthLogin({ email, password }: postAuthLoginProps) {
	const res = await axios.post('/auth/login', { email, password });
	return res.data as UserInfo;
}

/**
 * 비밀번호 변경
 */
interface putAuthPasswordProps {
	password: string;
	newPassword: string;
}
export async function putAuthPassword({ password, newPassword }: putAuthPasswordProps) {
	const res = await authAxios.put('/auth/password', { password, newPassword });
	return res.status as number; //204 성공
}

//===============================
//===========Cards===============
//===============================
/**
 * 카드 생성
 */
export async function postCards(cardItem: CardItemPost) {
	const res = await authAxios.post('/cards', cardItem);
	return res.data as CardItemGet;
}
/**
 * 카드 목록 조회
 */
interface getCardsProps {
	size: number;
	cursorId: number;
	columnId: number;
}
export async function getCards({ size, cursorId, columnId }: getCardsProps) {
	const res = await authAxios.get(`/cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`);
	return res.data as CardList;
}
/**
 * 카드 수정
 */
export async function putCardItem(cardId: number, cardItem: CardItemPost) {
	const res = await authAxios.put(`/cards/${cardId}`, cardItem);
	return res.data as CardItemGet;
}
/**
 * 카드 상세조회
 */
export async function getCardItem(cardId: number) {
	const res = await authAxios.get(`/cards/${cardId}`);
	return res.data as CardItemGet;
}
/**
 * 카드 삭제
 */
export async function deleteCardItem(cardId: number) {
	const res = await authAxios.delete(`/cards/${cardId}`);
	return res.status as number;
}
