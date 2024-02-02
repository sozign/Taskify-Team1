import CheckedIcon from '@/../../Public/assets/checked.svg';
import { putDashboard } from '@/lib/api';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../common/Buttons/Button';
import FormInput from '../../common/Input/FormInput';

interface EditBoxProps {
	title: string;
	color: '#7AC555' | '#760DDE' | '#FFA500' | '#76A6EA' | '#E876EA';
	dashboardId: number;
	loadDashboardData: (dashboardId: number) => Promise<void>;
}

function EditBox({ title, color, dashboardId, loadDashboardData }: EditBoxProps) {
	interface FormValue {
		title: string;
		color: '#7AC555' | '#760DDE' | '#FFA500' | '#76A6EA' | '#E876EA';
	}

	const { control, handleSubmit } = useForm<FormValue>({
		mode: 'onBlur',
		defaultValues: {
			title: title,
			color: color,
		},
	});

	const onSubmit: SubmitHandler<FormValue> = async (data) => {
		const res = await putDashboard(dashboardId, data);
		console.log(res);
		loadDashboardData(dashboardId);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mx-[2rem] flex flex-col sm:mx-[1.2rem]'>
			<div className='flex h-fit w-[62rem] flex-shrink-0 flex-col rounded-[0.8rem] bg-white px-[2.8rem] py-[2.9rem]'>
				<div className='flex justify-between'>
					<div className='w-fit text-20-700 text-black-3'>{title}</div>
					<Controller
						shouldUnregister={true}
						control={control}
						name='color'
						render={({ field }) => {
							return (
								<div className='flex gap-[1rem]'>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-green'>
										<input className=' opacity-0 ' type='radio' {...field} value='#7AC555' />
										{field.value === '#7AC555' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-purple'>
										<input className=' opacity-0 ' type='radio' {...field} value='#760DDE' />
										{field.value === '#760DDE' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-orange'>
										<input className=' opacity-0 ' type='radio' {...field} value='#FFA500' />
										{field.value === '#FFA500' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-blue'>
										<input className=' opacity-0 ' type='radio' {...field} value='#76A6EA' />
										{field.value === '#76A6EA' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
									<label className='relative h-[3rem] w-[3rem] rounded-[50%] bg-pink'>
										<input className=' opacity-0 ' type='radio' {...field} value='#E876EA' />
										{field.value === '#E876EA' && (
											<Image src={CheckedIcon} alt='Check Icon' className='absolute right-[0.3rem] top-[0.3rem]' />
										)}
									</label>
								</div>
							);
						}}
					/>
				</div>
				<div className='mt-[3.4rem] flex h-fit flex-col justify-between sm:mt-[2.2rem]'>
					<FormInput<FormValue> label='대시보드 이름' name='title' control={control} required={false} />
					<div className='mt-[1.6rem] flex justify-end sm:mt-[0.8rem]'>
						<Button type='submit' disabled={false} color='violet' variant='confirm'>
							변경
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default EditBox;
