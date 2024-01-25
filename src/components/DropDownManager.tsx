import React, { useEffect, useState, useRef } from 'react';
import { getMockData } from '@/lib/mockData';
import Select from 'react-select';

interface Option {
	value: string;
	label: string;
}

const DropDownManager: React.FC = () => {
	const [selectValue, setSelectValue] = useState<string>('');
	const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
	const selectInputRef = useRef<Select | null>(null);
	const [memberData, setMemberData] = useState(null);

	const onClearSelect = () => {
		if (selectInputRef.current) {
			selectInputRef.current.clearValue();
		}
	};

	const getDynamicOptions = (memberData) => {
		if (!memberData) {
			return [];
		}
		return memberData.members.map((member) => ({
			value: member.nickname,
			label: member.nickname,
		}));
	};

	const loadMembersData = async () => {
		const { data } = await getMockData();
		console.log(data);
		setMemberData(data[0]); // 여기서는 첫 번째 데이터를 사용하도록 가정하고 있습니다.
	};

	useEffect(() => {
		loadMembersData();
	}, []);

	useEffect(() => {
		setDynamicOptions(getDynamicOptions(memberData));
	}, [memberData]);

	useEffect(() => {
		console.log('Select Value changed:', selectValue);
	}, [selectValue]);

	return (
		<>
			<h3>담당자</h3>
			<Select
				ref={selectInputRef}
				onChange={(selectedOption: Option) => {
					if (selectedOption) {
						setSelectValue(selectedOption.value);
					} else {
						setSelectValue('');
					}
				}}
				options={dynamicOptions}
				placeholder='담당자를 선택하세요.'
			/>
			<button onClick={() => onClearSelect()}>초기화 </button>
		</>
	);
};

export default DropDownManager;

// //type 부분 이해하기
// import React, { useEffect, useState, useRef } from 'react';
// import { mockData } from '@/lib/mockData';
// //{ VauleType }
// import Select from 'react-select';

// // 예시로 사용할 동적 옵션 데이터
// const getDynamicOptions = (memberData) => {
// 	console.log(memberData);
// 	// 실제 데이터를 불러오거나 계산하는 로직을 추가할 수 있음
// 	return [
// 		{ value: '홍길동', label: '홍길동' },
// 		{ value: '이순신', label: '이순신' },
// 		{ value: '김유신', label: '김유신' },
// 	];
// };

// interface Option {
// 	value: string;
// 	label: string;
// }

// const DropDownManager: React.FC = () => {
// 	const [selectValue, setSelectValue] = useState<string>('');
// 	const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
// 	//Select<Option>
// 	const selectInputRef = useRef<Select | null>(null);
// 	//목데이터 가져오기
// 	const [memberData, setMemberData] = useState(null);

// 	const onClearSelect = () => {
// 		if (selectInputRef.current) {
// 			selectInputRef.current.clearValue();
// 		}
// 	};

// 	const loadMembersData = async () => {
// 		const { data } = await mockData();
// 		console.log(data);
// 		setMemberData(data);
// 	};

// 	useEffect(() => {
// 		loadMembersData();
// 	}, []);

// 	useEffect(() => {
// 		// selectValue 상태가 변경될 때마다 해당 값을 콘솔에 출력
// 		console.log('Select Value changed:', selectValue);
// 	}, [selectValue]); // selectValue가 변경될 때만 useEffect 실행

// 	useEffect(() => {
// 		// 컴포넌트가 마운트될 때 동적으로 옵션을 불러오는 예시
// 		setDynamicOptions(getDynamicOptions(memberData));
// 	}, []);

// 	return (
// 		<>
// 			<h3>담당자</h3>
// 			<Select
// 				ref={selectInputRef}
// 				// Option
// 				onChange={(selectedOption: Option) => {
// 					//e
// 					if (selectedOption) {
// 						setSelectValue((selectedOption as Option).value);
// 						//setSelectValue(e.value);
// 					} else {
// 						setSelectValue('');
// 					}
// 				}}
// 				options={dynamicOptions}
// 				placeholder='담당자를 선택하세요.'
// 			/>
// 			<button onClick={() => onClearSelect()}>초기화 </button>
// 		</>
// 	);
// };

// export default DropDownManager;
