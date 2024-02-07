export default function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
	return <div className='mt-[0.8rem] text-14-400 text-red'>{errorMessage}</div>;
}
