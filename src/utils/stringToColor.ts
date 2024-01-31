const stringToNumber = (str: string): number => {
	let hash = 0;

	// 문자의 ASCII 코드를 합산
	for (let i = 0; i < str.length; i++) {
		hash += str.charCodeAt(i);
	}

	// 정규화 및 0~4까지의 값으로 변환
	const normalizedValue = (hash % 1000) / 1000; // 0부터 1 사이의 값
	const mappedNumber = Math.floor(normalizedValue * 5); // 0부터 4 사이의 값

	return mappedNumber;
};
export default stringToNumber;
