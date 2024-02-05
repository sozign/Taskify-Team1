import React, { useRef, ChangeEvent, useState } from 'react';
import Image from 'next/image';
// import axios from 'axios';
import plusIcon from '@/../../Public/assets/myPage-plusIcon.svg';
import { postUsersProfileImage } from '@/lib/api';

interface AddImageProp {
	profileImageUrl: string | null;
	onImageUpload?: (imageUrl: string) => void | null;
}

export default function UploadImg({ profileImageUrl, onImageUpload }: AddImageProp) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
			setSelectedFile(file);
			const response = await postImageUrl(file);
			if (onImageUpload) {
				onImageUpload(response);
			}
		} else {
			setPreviewImage(null);
			setSelectedFile(null);
		}
	};

	const PreviewImage = (file: File) => {
		const preview = new FileReader();
		preview.onload = function (e) {
			const imageDataURL = e.target?.result as string;
			setPreviewImage(imageDataURL);
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
						className='h-[18.2rem] w-[18.2rem]'
					/>
					{profileImageUrl ? (
						<Image
							id='user_image'
							src={previewImage || profileImageUrl}
							alt='이미지'
							className='mr-[1.6rem] h-[18.2rem] w-[18.2rem] rounded-md sm:h-[10rem] sm:w-[10rem]'
							onClick={handleImageClick}
							width={182}
							height={182}
						/>
					) : (
						<div
							onClick={handleImageClick}
							className='flex h-[18.2rem] w-[18.2rem] items-center justify-center rounded-md bg-[#F5F5F5]'
						>
							<Image src={plusIcon} alt='plus 이미지' className='h-[3rem] w-[3rem]' />
						</div>
					)}
				</label>
			</div>
		</>
	);
}
