import { postColumn } from '@/lib/api';
import { Dispatch, SetStateAction } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import FormInput from '../common/Input/FormInput';
import Layout from './Layout';
import { useDashboardContext } from '@/context/DashboardContext';

interface ColumnAddModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	dashboardId: number;
	loadColumn: () => Promise<void>;
}

interface FormValueProps {
	title: string;
	dashboardId: number;
}

function AddColumnModal({ isOpen, setOpen, dashboardId, loadColumn }: ColumnAddModalProps) {
	const {
		value: { columnList },
	} = useDashboardContext();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValueProps>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			dashboardId: dashboardId,
		},
	});

	const RULES = {
		title: {
			validate: (value: string | number) => {
				const existColumns = columnList.map((column) => column.title);
				return !existColumns.includes(String(value)) || '중복된 컬럼 이름입니다.';
			},
		},
	};

	const onSubmit: SubmitHandler<FormValueProps> = async (data) => {
		await postColumn(data);
		setOpen((prev) => !prev);
		loadColumn();
	};

	const isNoError = (obj: FieldErrors<FormValueProps>) => Object.keys(obj).length === 0;

	return (
		<Layout $modalType='Modal' title='새 컬럼 생성' isOpen={isOpen} setOpen={setOpen}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput<FormValueProps>
					label='이름'
					name='title'
					control={control}
					rules={RULES.title}
					required={!!('required' in RULES.title)}
				/>
				<div className='mt-[2.8rem] flex justify-end gap-[1.2rem] sm:mt-[2.4rem]'>
					<Button disabled={false} color='modalWhite' variant='modal' onClick={() => setOpen(false)}>
						취소
					</Button>
					<Button type='submit' disabled={!isNoError(errors)} color='modalViolet' variant='modal'>
						생성
					</Button>
				</div>
			</form>
		</Layout>
	);
}

export default AddColumnModal;
