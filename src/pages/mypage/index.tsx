//강의 02 6:35  setting page
// 상태관리 라이브러리 뷰스탄드 context 새로 갱신하게

/**
 * 내 정보 조회
 */
// export async function getUsers() {
// 	const res = await authAxios.get<UserInfo>(`/users/me`);
// 	return res.data;
// }

// interface putUsersProps {
// 	nickname: string;
// 	profileImageUrl: string;
// }
/**
 * 내 정보 수정
 */
// export async function putUsers(userData: putUsersProps) {
// 	const res = await authAxios.put<UserInfo>(`/users/me`, userData);
// 	return res.data;
// }

/**
 * 프로필 이미지 업로드
 */
// export async function postUsersProfileImage(imageFile: ImagePost) {
// 	const res = await authAxios.post<UsersProfileImagePost>(`/users/me/image`, imageFile);
// 	return res.data;
// }
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import DashboardHeader from '@/components/common/Headers/DashboardHeader';
import Image from 'next/image';
import FormInput from '@/components/common/Input/FormInput';
// import AuthInput from '@/components/common/Input/AuthInput';
import PageLayout from '@/components/common/PageLayout';
import plusIcon from '@/../../Public/assets/myPage-plusIcon.svg';
import leftArrow from '@/../../Public/assets/myPage-leftArrow.svg';
import PassWordForm from '@/components/myPage/PassWordForm';
// import { VALIDATE_RULES } from '@/constants/validation';

//모달확인하기위해 import
import MyPageModal from '@/components/modal/MyPageModal';

type emailNicknameFormData = {
	email: string;
	nickname: string;
};

export default function MyPage() {
	// 모달창 확인을 위한 useState
	const [open, setOpen] = useState(false);

	const additionHandleClick = () => {
		setOpen((prev) => !prev);
	};

	const {
		register,
		// setValue,
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<emailNicknameFormData>();
	const onSubmit: SubmitHandler<emailNicknameFormData> = (data) => console.log(data);
	return (
		<>
			<DashboardHeader dashboardId={0} title={'계정관리'} />
			<PageLayout>
				{/* 모달창 확인하기 위해 임시 생성 */}
				<div>
					<div onClick={additionHandleClick}>모달 확인하러 가기</div>

					{open === true ? <MyPageModal isOpen={open} setOpen={setOpen} /> : null}
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
							<form className='ml-[2.8rem] sm:ml-[2rem]' onSubmit={handleSubmit(onSubmit)}>
								{/* 이미지와 인풋 */}
								<div className='flex w-[56.4rem] md:w-[48.8rem] sm:flex-col'>
									<div className=' mr-[1.6rem] flex h-[18.2rem] w-[18.2rem] items-center justify-center rounded-md bg-[#F5F5F5] sm:h-[10rem] sm:w-[10rem] '>
										<Image src={plusIcon} alt='plus 이미지' className='h-[3rem] w-[3rem]' />
									</div>
									<div className='w-[36.6rem]'>
										<FormInput
											label='이메일'
											className='email sm:mt-[2.4rem] sm:w-[24.4rem]'
											control={control}
											required={false}
											{...register('email')}
										/>
										{/* error 메세지 표기 안해줬음 => 이게 버튼 클릭시 넘어가는지는 확인 필요 */}
										<FormInput
											label='닉네임'
											className='nickname sm:mt-[1.6rem] sm:w-[24.4rem]'
											control={control}
											required={false}
											{...register('nickname')}
										/>
										{/* <AuthInput
											label='닉네임'
											className='nickname'
											required={!!VALIDATE_RULES.nickname.required}
											{...register('nickname')}
											type='text'
										/> */}
									</div>
								</div>
								<Button
									color='violet'
									disabled={isSubmitting}
									type='submit'
									variant='confirm'
									//check) mb-[2.8rem] 적용 못함
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
