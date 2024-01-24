import Button from '@/components/common/Buttons/Button';

export default function Home() {
	return (
		<div>
			<Button color='violet' variant='confirm'>
				수락
			</Button>
			<Button color='white' variant='confirm'>
				거절
			</Button>
			<Button color='white' variant='delete-lg'>
				삭제
			</Button>
			<Button color='white' variant='delete-sm'>
				삭제
			</Button>
			<Button color='white' variant='commentInput'>
				입력
			</Button>
			<Button color='modalWhite' variant='modal'>
				취소
			</Button>
			<Button color='modalViolet' variant='modal'>
				확인
			</Button>
		</div>
	);
}
