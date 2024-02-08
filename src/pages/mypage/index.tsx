import { useState, useEffect } from 'react';
import { useForm, FieldValues, FieldError } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import Image from 'next/image';
import PageLayout from '@/components/common/PageLayout';
import leftArrow from '@/../../Public/assets/myPage-leftArrow.svg';
import PassWordForm from '@/components/myPage/PassWordForm';
import { getUsers, putUsers } from '@/lib/api';
import UploadImg from '@/components/myPage/UploadImg';
import MyPageProfileModal from '@/components/modal/MyPageProfileModal';

type profileFormData = {
	email: string;
	nickname: string;
	profileImageUrl: string | null;
};

type putUsersData = {
	nickname: string;
	profileImageUrl: string | null;
};

export default function MyPage() {
	const [open, setOpen] = useState<boolean>(false);
	const [isProfileActive, setIsProfileActive] = useState<boolean>(false);

	const prevClickHandler = () => {
		window.history.back();
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitting, isSubmitted, errors },
	} = useForm<FieldValues>({});

	//GetApi
	const [userInfo, setUserInfo] = useState<profileFormData>({
		email: '',
		nickname: '',
		profileImageUrl: '',
	});

	const loadMember = async () => {
		try {
			const data = await getUsers();
			const { email, nickname, profileImageUrl } = data;
			setUserInfo({ email, nickname, profileImageUrl });
			setDataToUpdate({
				nickname,
				profileImageUrl,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadMember();
	}, []);

	//PutUserData
	const [dataToUpdate, setDataToUpdate] = useState<putUsersData>({
		nickname: userInfo.nickname,
		profileImageUrl: userInfo.profileImageUrl,
	});

	const PutUserInfo = async (data: putUsersData) => {
		try {
			const response = await putUsers(data);
			if (response.status === 200) {
				setUserInfo((prevUserInfo: profileFormData) => {
					return {
						...prevUserInfo,
						nickname: dataToUpdate.nickname || prevUserInfo.nickname,
						profileImageUrl: response.data.profileImageUrl || prevUserInfo.profileImageUrl,
					};
				});
			} else {
				console.error('PUT 요청 실패:', response.status);
			}
		} catch (error) {
			console.error('PUT 요청 에러:', error);
			throw error;
		}
	};

	const handleImageUpload = (imgUrl: string) => {
		setDataToUpdate((prevData) => {
			return {
				...prevData,
				profileImageUrl: imgUrl,
			};
		});
	};

	const handleSaveButtonClick = async () => {
		try {
			await handleSubmit(async (data) => {
				if (data) {
					setOpen((prev) => !prev);
					setIsProfileActive(false);
				}
				// Save 버튼에 대한 추가 동작 구현
				await PutUserInfo(dataToUpdate);
			})();
		} catch (error) {
			console.error('데이터 처리 중 에러:', error);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value || watch('nickname')) {
			setIsProfileActive(true);
		} else {
			setIsProfileActive(false);
		}
		setDataToUpdate((prevData) => ({
			...prevData,
			nickname: value,
		}));
	};

	return (
		<>
			<PageLayout>
				<DashboardHeader title={'내 정보'} dashboardId={0} />
				<div className=' bg-[#FAFAFA]'>
					<div className=' ml-[2rem] sm:ml-[1.2rem]'>
						<p
							onClick={prevClickHandler}
							className='t-[#333236] flex items-center pt-[2rem] text-[1.6rem] font-medium sm:text-[1.4rem]'
						>
							<Image
								src={leftArrow}
								alt='leftArrow 이미지'
								className='mr-[0.6rem] h-[2rem] w-[2rem] sm:h-[1.8rem] sm:w-[1.8rem]'
							/>
							돌아가기
						</p>
						{/* 프로필 창  */}
						<div className='mt-[2.5rem] h-[35.5rem] w-[62rem] rounded-lg bg-white md:w-[54.4rem] sm:h-[46.2rem] sm:w-[28.4rem] sm:text-[2rem]'>
							<p className=' ml-[2.8rem] py-[3.2rem] text-[2.4rem] font-bold text-[#332636] sm:ml-[2rem] sm:pb-[2.4rem] sm:pt-[2.8rem] sm:text-20-700'>
								프로필
							</p>
							<form className='ml-[2.8rem] sm:ml-[2rem]' onSubmit={handleSubmit((data) => alert(data))}>
								{/* 이미지와 인풋 */}
								<div className='flex w-[56.4rem] md:w-[48.8rem] sm:flex-col'>
									{/* profileImage는 null값을 넘김 */}
									<UploadImg
										profileImageUrl={userInfo.profileImageUrl}
										onImageUpload={handleImageUpload}
										setIsProfileActive={setIsProfileActive}
									/>
									<div className=' w-[36.6rem] md:w-[29rem] sm:w-[24.4rem]  '>
										<div className='sm:mt-[2.4rem]'>
											<label htmlFor='email' className='text-18-500 sm:text-16-500'>
												이메일
											</label>
											<input
												id='email'
												type='email'
												disabled
												placeholder={userInfo.email}
												className='container mt-[1rem] h-[4.8rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D md:w-[100%] '
											/>
										</div>
										<div className='mt-[1.6rem]'>
											<label htmlFor='nickName' className='text-18-500 sm:text-16-500'>
												닉네임
											</label>
											<input
												id='nickName'
												type='text'
												defaultValue={userInfo.nickname}
												className='container mt-[1rem] h-[4.8rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D md:w-[100%]'
												{...register('nickName', {
													required: '',
													maxLength: {
														value: 10,
														message: '열 자 이하로 작성해 주세요.',
													},
												})}
												onChange={handleInputChange}
											/>
											{isSubmitted && errors.nickName && (
												<small key='nickName-error' role='alert' className='text-14-400 text-red'>
													{(errors.nickName as FieldError).message}
												</small>
											)}
										</div>
									</div>
								</div>
								<Button
									color='toggleColor'
									disabled={isSubmitting}
									type='submit'
									onClick={() => handleSaveButtonClick()}
									variant='confirm'
									className={`float-right mb-[2.8rem] mr-[2.8rem] mt-[2.4rem] flex ${isProfileActive ? 'bg-violet-5' : 'bg-gray-D'} `}
								>
									저장
								</Button>
								{open && <MyPageProfileModal isOpen={open} setOpen={setOpen} />}
							</form>
						</div>
						<PassWordForm />
					</div>
				</div>
			</PageLayout>
		</>
	);
}
