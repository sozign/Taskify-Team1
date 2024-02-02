import { MembersData } from '@/constants/types';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import Select from 'react-select';

interface DropDownProps<T extends FieldValues> extends UseControllerProps<T> {
	dashboardMemberList: MembersData[];
}

const DropDownManager = <T extends FieldValues>({ dashboardMemberList, control, name }: DropDownProps<T>) => {
	const options = dashboardMemberList.map((member) => ({
		value: member.id + '',
		label: <div>컴포넌트자리 {member.nickname}</div>,
	}));

	const {
		field: { onChange, onBlur, value, ref },
	} = useController({ name, control, shouldUnregister: true });

	return (
		<>
			<h3 className='mb-[1rem] text-18-500'>담당자</h3>
			<Select
				inputId='contact'
				onChange={(selectedOption) => {
					onChange(+(selectedOption?.value ?? ''));
				}}
				onBlur={onBlur}
				value={options.find((option) => option.value === value)}
				ref={ref}
				options={options}
				placeholder='이름을 입력해 주세요'
				className='mb-[3.2rem] w-[50%] rounded-md'
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: '#5534DA',
					},
				})}
				// select 컴포넌트 커스텀
				styles={{
					dropdownIndicator: (provided) => ({
						...provided,
						color: '#333236',
					}),
					placeholder: (provided) => ({
						...provided,
						color: '#D9D9D9',
					}),
					control: (provided) => ({
						...provided,
						fontSize: '16px',
						height: '50px',
					}),
					menu: (provided) => ({
						...provided,
						paddingTop: '13px',
						paddingBottom: '13px',
						fontSize: '16px',
					}),
					option: (base, { isFocused, isSelected }) => ({
						...base,
						backgroundColor: isFocused ? '#ccc' : isSelected ? 'transparent' : 'transparent',
						color: isFocused || isSelected ? '#000' : base.color,
						fontSize: '16px',
					}),
				}}
				components={{
					// 구분선 숨김
					IndicatorSeparator: () => null,
				}}
			/>
		</>
	);
};

export default DropDownManager;
