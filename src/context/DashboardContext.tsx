import { ColumnData, MembersData } from '@/constants/types';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

// 상태 타입 정의
type DashBoardContextState = {
	value: {
		memberList: MembersData[];
		columnList: ColumnData[];
	};
	action: {
		setMemberList: Dispatch<SetStateAction<MembersData[]>>;
		setColumnList: Dispatch<SetStateAction<ColumnData[]>>;
	};
};

// 초기 상태
const initialState: DashBoardContextState = {
	value: {
		memberList: [],
		columnList: [],
	},
	action: {
		setMemberList: () => {},
		setColumnList: () => {},
	},
};

// Context 생성
const DashBoardContext = createContext<DashBoardContextState>(initialState);

// Context Provider 컴포넌트
export const DashBoardContextProvider = ({ children }: { children: ReactNode }) => {
	const [memberList, setMemberList] = useState<MembersData[]>([]);
	const [columnList, setColumnList] = useState<ColumnData[]>([]);

	// Context 값
	const contextValue: DashBoardContextState = {
		value: { memberList, columnList },
		action: { setMemberList, setColumnList },
	};

	return <DashBoardContext.Provider value={contextValue}>{children}</DashBoardContext.Provider>;
};

// 커스텀 훅
export const useDashboardContext = () => {
	const context = useContext(DashBoardContext);
	if (!context) {
		throw new Error('DashBoardContext 내부에서 사용해야합니다');
	}
	return context;
};
