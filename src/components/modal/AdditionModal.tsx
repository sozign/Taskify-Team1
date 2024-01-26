import { Dispatch, SetStateAction } from 'react';
import Layout from './Layout';
import Button from '../common/Buttons/Button';
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/common/Input/AuthInput';
import { VALIDATE_RULES } from '@/constants/validation';

interface ModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

type SigninFormData = {
	email: string;
};

function AdditionModal({ isOpen, setOpen }: ModalProps) {
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors },
	} = useForm<SigninFormData>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
		},
	});

	const INPUT_SETTING = {
		label: {
			email: '이메일',
		},
		placeholder: {
			email: '이메일을 입력해 주세요.',
		},
	};

	const onSubmit = (data: SigninFormData) => {
		console.log(data);
	};
	return (
		<Layout title='초대하기' $modalType='Modal' isOpen={isOpen} setOpen={setOpen}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthInput
					type='email'
					required={!!VALIDATE_RULES.email?.required}
					label={INPUT_SETTING.label.email}
					placeholder={INPUT_SETTING.placeholder.email}
					errorMessage={errors?.email?.message}
					{...register('email', VALIDATE_RULES.email)}
					className='pb-[3.2rem]'
				/>
				<div className='bottom-[2.8rem] right-[2.8rem] flex flex-row-reverse gap-3'>
					<Button color='modalViolet' variant='modal' disabled={false}>
						초대
					</Button>
					<Button color='modalWhite' variant='modal' onClick={() => setOpen(false)} disabled={false}>
						취소
					</Button>
				</div>
			</form>
		</Layout>
	);
}

export default AdditionModal;
