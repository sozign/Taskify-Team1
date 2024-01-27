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

	const onClearSelect = () => {
		if (selectInputRef.current) {
			selectInputRef.current.clearValue();
		}
	};

	const getDynamicOptions = (memberData) => {
		if (!memberData) {
			return [];
		}

		return memberData.members.map((member) => {
			const label = (
				<div className='flex items-center '>
					{/* null 일경우 스타일을 보여줄수 있는 함수 제작? 또는 초기값 설정필요 */}
					{member.profileImageUrl ? (
						<img
							className={` mr-[0.37rem]  h-[1.625rem] w-[1.625rem]  rounded-[50%]`}
							src={member.profileImageUrl}
							alt={`${member.nickname}'s profile`}
						/>
					) : (
						'null'
					)}
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
		// console.log(data);
		setMemberData(data[0]);
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
			<h3 className='text-lg mb-2.5 text-12-500'>담당자</h3>
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
				placeholder='선택하세요.'
				className='css-b62m3t w-[13.6rem] rounded-md '
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: '#5534DA',
					},
				})}
				styles={{
					option: (base, { isFocused, isSelected }) => ({
						...base,
						backgroundColor: isFocused ? '#ccc' : isSelected ? 'transparent' : 'transparent',
						color: isFocused || isSelected ? '#000' : base.color,
					}),
				}}
				components={{
					IndicatorSeparator: () => null,
				}}
			/>
			<button onClick={() => onClearSelect()}>초기화 </button>
		</>
	);
};

export default DropDownManager;
