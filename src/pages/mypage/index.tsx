// 강의 02 6:35  setting page
// 상태관리 라이브러리 뷰스탄드 context 새로 갱신하게

import { useState, useEffect } from 'react';
import { useForm, FieldValues, FieldError } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import MyDashboardHeader from '@/components/common/Headers/MyDashboardHeader';
import Image from 'next/image';
import PageLayout from '@/components/common/PageLayout';

import leftArrow from '@/../../Public/assets/myPage-leftArrow.svg';
import PassWordForm from '@/components/myPage/PassWordForm';
import { getUsers, putUsers } from '@/lib/api';
import UploadImg from '@/components/myPage/UploadImg';

//모달확인하기위해 import
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
	// 모달창 확인을 위한 useState
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
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
			console.log({ response });
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

	//이함수에 imgUrl 데이터를 받아오겠다.
	const handleImageUpload = (imgUrl: string) => {
		//현재 상태의 데이터에 imgUrl을 추가해주겠다.
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
					setOpen(true);
				}
				// Save 버튼에 대한 추가 동작 구현
				await PutUserInfo(dataToUpdate);
			})();
		} catch (error) {
			console.error('데이터 처리 중 에러:', error);
		}
	};

	const additionHandleClick = () => {
		setOpen((prev) => !prev);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDataToUpdate((prevData) => ({
			...prevData,
			nickname: value,
		}));
	};

	return (
		<>
			<MyDashboardHeader title={'내 정보'} nickname={'nickname'} profileImageUrl={''} />
			<PageLayout>
				{/* 모달창 확인하기 위해 임시 생성 */}
				<div>
					<div onClick={additionHandleClick}>모달 확인하러 가기</div>

					{open === true ? <MyPageProfileModal isOpen={open} setOpen={setOpen} /> : null}
				</div>
				<div className=' bg-[#FAFAFA]'>
					<div className=' ml-[2rem] sm:ml-[1.2rem]'>
						{/* 바로 직전에 클릭했던 링크로 되돌아가야한다. */}
						{/* <Link href=''> */}
						<p className='t-[#333236] flex items-center pt-[2rem] text-[1.6rem] font-medium sm:text-[1.4rem]'>
							<Image
								src={leftArrow}
								alt='leftArrow 이미지'
								className='mr-[0.6rem] h-[2rem] w-[2rem] sm:h-[1.8rem] sm:w-[1.8rem]'
							/>
							돌아가기
						</p>
						{/* </Link> */}
						{/* 프로필 창  */}
						<div className='mt-[2.5rem] h-[35.5rem] w-[62rem] rounded-lg bg-white md:w-[54.4rem] sm:h-[42.2rem] sm:w-[28.4rem] sm:text-[2rem]'>
							<p className=' ml-[2.8rem] py-[3.2rem] text-[2.4rem] font-bold text-[#332636] sm:ml-[2rem] sm:pb-[2.4rem] sm:pt-[2.8rem]'>
								프로필
							</p>
							<form className='ml-[2.8rem] sm:ml-[2rem]' onSubmit={handleSubmit((data) => alert(data))}>
								{/* 이미지와 인풋 */}
								<div className='flex w-[56.4rem] md:w-[48.8rem] sm:flex-col'>
									{/* profileImage는 null값을 넘김 */}
									<UploadImg profileImageUrl={userInfo.profileImageUrl} onImageUpload={handleImageUpload} />
									<div className='w-[36.6rem]'>
										<div>
											<label htmlFor='email' className='text-18-500'>
												이메일
											</label>
											<input
												id='email'
												type='email'
												disabled
												placeholder={userInfo.email}
												className='container mt-[1rem] h-[4.8rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D sm:mt-[2.4rem] sm:w-[24.4rem]'
											/>
										</div>
										<div className='mt-[2rem]'>
											<label htmlFor='nickName' className='text-18-500'>
												닉네임
											</label>
											<input
												id='nickName'
												type='text'
												defaultValue={userInfo.nickname}
												className='container mt-[1rem] h-[4.8rem] rounded-[0.8rem] border border-gray-D bg-white px-[1.5rem] py-[1.2rem] align-top text-16-400 placeholder:mt-0 placeholder:text-gray-D sm:mt-[2.4rem] sm:w-[24.4rem]'
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
									color='violet'
									disabled={isSubmitting}
									type='submit'
									onClick={() => handleSaveButtonClick()}
									variant='confirm'
									className='float-right mb-[2.8rem] mr-[2.8rem]  mt-[1.6rem] flex '
								>
									저장
								</Button>
							</form>
						</div>
						<PassWordForm />
					</div>
				</div>
			</PageLayout>
		</>
	);
}
