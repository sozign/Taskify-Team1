const VALIDATE_REGEX = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
	password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
};

export const VALIDATE_RULES = {
	email: {
		required: '이메일을 입력해주세요',
		pattern: {
			value: VALIDATE_REGEX.email,
			message: '올바른 이메일 주소가 아닙니다',
		},
	},
	passwordInLogin: {
		required: '비밀번호를 입력해 주세요',
	},
	passwordInSignup: {
		required: '비밀번호를 입력해 주세요',
		pattern: {
			value: VALIDATE_REGEX.password,
			message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요',
		},
	},
};
