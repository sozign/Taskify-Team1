import React, { useRef, ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
// import axios from 'axios';
import plusIcon from '@/../../public/assets/myPage-plusIcon.svg';
import { postUsersProfileImage } from '@/lib/api';

interface AddImageProp {
	profileImageUrl: string | null;
	onImageUpload?: (imageUrl: string) => void | null;
	setIsProfileActive: (active: boolean) => void;
}

export default function UploadImg({ profileImageUrl, onImageUpload, setIsProfileActive }: AddImageProp) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	// const [isProfileActive, setIsProfileActive] = useState<boolean>(false); // 프로필 이미지가 선택되었는지 여부를 추적하는 상태

	//클릭 하면 파일 입력창을 열리게 하겠다.
	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// 파일 입력 요소의 값이 변경되면 호출되는 함수
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		// 선택한 파일 정보를 콘솔에 출력
		const file = e.target.files?.[0];
		if (file) {
			PreviewImage(file);
			// console.log(PreviewImage);
			setSelectedFile(file);
			// console.log(selectedFile);
			const response = await postImageUrl(file);
			if (onImageUpload) {
				onImageUpload(response);
			}
		} else {
			setPreviewImage(undefined);
			setSelectedFile(null);
		}
	};

	const PreviewImage = (file: File) => {
		const preview = new FileReader();
		preview.onload = function () {
			// const imageDataURL = e.target?.result as string;
			// console.log(imageDataURL);
			setPreviewImage(preview.result as string);
			// setPreviewImage(imageDataURL);
			setIsProfileActive(true);

			console.log(previewImage);
		};
		preview.readAsDataURL(file);
	};

	// Post API
	const postImageUrl = async (data: File) => {
		try {
			const formData = new FormData();
			formData.append('image', data);

			// 이미지 업로드를 위한 POST 요청
			const response = await postUsersProfileImage(formData);

			const imageURL = response.data.profileImageUrl;
			if (onImageUpload) {
				onImageUpload(imageURL);
			}

			return imageURL;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	useEffect(() => {
		console.log(previewImage); // previewImage가 변경될 때마다 콘솔에 출력
	}, [previewImage]);

	return (
		<>
			<div>
				<label htmlFor='chooseFile'>
					<input
						type='file'
						ref={fileInputRef}
						accept='image/*'
						id='user_profile_img'
						required
						multiple
						onChange={handleChange}
						style={{ display: 'none' }}
						className='h-[18.2rem] w-[18.2rem] '
					/>
					{previewImage && (
						<Image
							id='user_image'
							src={previewImage}
							alt='미리보기 이미지'
							className='mr-[1.6rem] h-[18.2rem] w-[18.2rem] rounded-md sm:h-[10rem] sm:w-[10rem]'
							onClick={handleImageClick}
							width={182}
							height={182}
						/>
					)}
					{profileImageUrl && !previewImage && (
						<Image
							id='user_image'
							src={profileImageUrl}
							alt='프로필 이미지'
							className='mr-[1.6rem] h-[18.2rem] w-[18.2rem] rounded-md sm:h-[10rem] sm:w-[10rem]'
							onClick={handleImageClick}
							width={182}
							height={182}
						/>
					)}
					{!previewImage && !profileImageUrl && (
						<div
							onClick={handleImageClick}
							className='mr-[1.6rem] flex h-[18.2rem] w-[18.2rem] items-center justify-center rounded-md bg-[#F5F5F5] sm:h-[10rem] sm:w-[10rem]'
						>
							<Image src={plusIcon} alt='플러스 이미지' className='h-[3rem] w-[3rem]' />
						</div>
					)}
				</label>
			</div>
		</>
	);
}
