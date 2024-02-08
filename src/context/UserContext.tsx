import { UserInfo } from '@/constants/types';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

// 상태 타입 정의
type UserContextState = {
	value: {
		userInfo: UserInfo | null;
	};
	action: {
		setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
	};
};

// 초기 상태
const initialState: UserContextState = {
	value: {
		userInfo: null,
	},
	action: {
		setUserInfo: () => {},
	},
};

// Context 생성
const UserContext = createContext<UserContextState>(initialState);

// Context Provider 컴포넌트
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	// Context 값
	const contextValue: UserContextState = {
		value: { userInfo },
		action: { setUserInfo },
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// 커스텀 훅
export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('UserContext 내부에서 사용해야합니다');
	}
	return context;
};
