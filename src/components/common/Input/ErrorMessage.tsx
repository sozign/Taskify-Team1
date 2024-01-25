export default function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
	return <div className='text-14-400 text-red'>{errorMessage}</div>;
}
