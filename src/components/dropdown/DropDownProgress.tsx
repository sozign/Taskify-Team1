import { ColumnData } from '@/constants/types';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import Select from 'react-select';
import StatusChip from '../common/chips/StatusChip';

interface DropDownProps<T extends FieldValues> extends UseControllerProps<T> {
	columnList: ColumnData[];
}

const DropDownProgress = <T extends FieldValues>({ columnList, control, name }: DropDownProps<T>) => {
	const options = columnList.map((columnItem) => ({
		value: columnItem.id + '',
		label: (
			<div className='flex gap-[0.8rem]'>
				<StatusChip value={columnItem.title} />
			</div>
		),
	}));

	const {
		field: { onChange, onBlur, value, ref },
	} = useController({ name, control, shouldUnregister: true });

	return (
		<>
			<h3 className='mb-[1rem] text-18-500 leading-[1.9rem] leading-[2.1rem]'>상태</h3>
			<Select
				inputId='contact'
				onChange={(selectedOption) => {
					onChange(+(selectedOption?.value ?? ''));
				}}
				onBlur={onBlur}
				value={options.find((option) => option.value == value)}
				ref={ref}
				options={options}
				placeholder='이름을 입력해 주세요'
				className='container rounded-md'
				styles={{
					dropdownIndicator: (provided) => ({
						...provided,
						color: '#333236',
					}),
					placeholder: (provided) => ({
						...provided,
						color: '#D9D9D9',
					}),
					control: (provided, state) => ({
						...provided,
						fontSize: '16px',
						height: '50px',
						borderRadius: '6px',
						border: 'none',
						boxShadow: state.isFocused ? '0 0 0 2px #5534DA' : '0 0 0 1px #D9D9D9',
					}),
					menu: (provided) => ({
						...provided,
						paddingTop: '13px',
						paddingBottom: '13px',
						fontSize: '16px',
					}),
					option: (provided, { isFocused, isSelected }) => ({
						...provided,
						backgroundColor: isFocused ? '#D9D9D9' : isSelected ? 'D9D9D9' : 'transparent',
						color: isFocused || isSelected ? '#000' : provided.color,
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

export default DropDownProgress;
