import { useState, useCallback } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

function useAsync<T>(asyncFunction: AsyncFunction<T>) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const wrappedFunction = useCallback(
		async (...args: any[]) => {
			setLoading(true);
			setError(null);
			try {
				return await asyncFunction(...args);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		},
		[asyncFunction],
	);

	return [loading, error, wrappedFunction] as const;
}

export default useAsync;
