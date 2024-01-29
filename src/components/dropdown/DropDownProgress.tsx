// 📍 참고
// {teamId}/columns/{columnId} tilte 데이터를 받아온다.
// title로 (to do / on progress / done) 값을 받아오도록
// react-hook-form에 외부라이브러리 react-select 양식을 따른 컴포넌트 제작

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import StatusChip from '../common/chips/StatusChip';

interface Option {
	value: string;
	label: string;
}

type OptionLabeProps = {
	value: string;
};

const DropDownProgress = () => {
	const [selectValue, setSelectValue] = useState<string>('');

	//값 입력
	const options: Option[] = [
		{ value: 'to do', label: 'to do' },
		{ value: 'on progress', label: 'on progress' },
		{ value: 'done', label: 'done' },
	];

	const formatOptionLabel: React.FC<OptionLabeProps> = ({ value }) => (
		<div style={{ display: 'flex' }}>
			<StatusChip value={value} />
		</div>
	);

	useEffect(() => {
		console.log('Select Value changed:', selectValue);
	}, [selectValue]);

	return (
		<>
			<h3 className='text-lg mb-2.5 text-12-500'>상태</h3>
			<Select
				inputId='situation'
				//react-hook-form 라이브러리 사용시 필수
				// ref={ref}
				onChange={(selectedOption: Option | null) => {
					if (selectedOption) {
						setSelectValue(selectedOption.value);
					} else {
						setSelectValue('');
					}
				}}
				options={options}
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
				formatOptionLabel={formatOptionLabel}
			/>
		</>
	);
};

export default DropDownProgress;
