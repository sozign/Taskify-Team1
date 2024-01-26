//프로필 이미지 처리 해주기
// css작업 시작 하기
import React, { useEffect, useState, useRef } from 'react';
import { getMockData } from '@/lib/mockData';
import Select from 'react-select';

interface Option {
	value: string;
	label: string;
}

const DropDownManager = () => {
	const [selectValue, setSelectValue] = useState<string>('');
	//드롭다운 목록 옵션을 저장하는데 사용
	const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
	const selectInputRef = useRef<Select | null>(null);
	const [memberData, setMemberData] = useState(null);
	// const [profileData, setProfileData] = useState(null);

	const onClearSelect = () => {
		if (selectInputRef.current) {
			selectInputRef.current.clearValue();
		}
	};
	//option 객체 생성하여 반환
	const getDynamicOptions = (memberData) => {
		if (!memberData) {
			return [];
		}

		return memberData.members.map((member) => {
			const label = (
				<div>
					{/* null 일경우 스타일을 보여줄수 있는 함수 제작? 또는 초기값 설정필요 */}
					{member.profileImageUrl ? <img src={member.profileImageUrl} alt={`${member.nickname}'s profile`} /> : 'null'}
					{member.nickname}
				</div>
			);

			return {
				value: member.nickname,
				label: label,
			};
		});
	};
	const loadMembersData = async () => {
		const { data } = await getMockData();
		console.log(data);
		console.log(data[0]);
		setMemberData(data[0]);
		// setProfileData()
		// 여기서는 첫 번째 데이터를 사용하도록 가정하고 있습니다.
	};

	useEffect(() => {
		loadMembersData();
	}, []);

	useEffect(() => {
		//useEffect 함수 내에서 getDynamicOptions 함수를 호출하고, 그 결과를 setDynamicOptions 함수를 통해 상태로 설정
		setDynamicOptions(getDynamicOptions(memberData));
	}, [memberData]);

	useEffect(() => {
		console.log('Select Value changed:', selectValue);
	}, [selectValue]);

	return (
		<>
			<h3>담당자</h3>
			{/* 드롭다운 창에 클릭한 값이 나타나도록 */}
			<Select
				ref={selectInputRef}
				onChange={(selectedOption: Option) => {
					if (selectedOption) {
						//선택된 옵션의 value값을 담아 오겠다.
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
