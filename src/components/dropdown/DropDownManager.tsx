//{teamId}/members 의 nickname, profileImageUrl 데이터를 가져온다.
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getMockManagerData } from '@/components/dropdown/mockData';

interface Option {
	value: string;
	label: JSX.Element;
}

interface MemberData {
	id: number;
	userId: number;
	email: string;
	nickname: string;
	profileImageUrl: string | null;
	createdAt: string;
	updatedAt: string;
	isOwner: boolean;
}

const DropDownManager = () => {
	const [selectValue, setSelectValue] = useState<string>('');
	const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
	// const selectInputRef = useRef<HTMLInputElement>(null);
	const [memberData, setMemberData] = useState<MemberData[] | null>(null);

	const getDynamicOptions = (data: MemberData[] | null) => {
		if (!data) {
			return [];
		}

		return data.map((member) => {
			const label = (
				<div className='flex items-center '>
					{member.profileImageUrl ? (
						<img
							className={`mr-[0.37rem] h-[1.625rem] w-[1.625rem] rounded-[50%]`}
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
		const { data } = await getMockManagerData();
		setMemberData(data[0]?.members || null);
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
			<h3 className='text-lg mb-2.5 text-12-500'>담당자</h3>
			<Select
				inputId='contact'
				//react-hook-form 라이브러리 사용시 필수
				// ref={ref}
				onChange={(selectedOption: Option | null) => {
					if (selectedOption) {
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
		</>
	);
};

export default DropDownManager;
