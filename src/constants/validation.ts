const VALIDATE_REGEX = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
	password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
	nickname: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
	checked: /^true$/,
};

export const VALIDATE_RULES = {
	email: {
		required: '이메일을 입력해주세요.',
		pattern: {
			value: VALIDATE_REGEX.email,
			message: '이메일 형식으로 작성해 주세요.',
		},
	},
	nickname: {
		required: '닉네임을 작성해 주세요.',
		pattern: {
			value: VALIDATE_REGEX.nickname,
			message: '열 자 이하로 작성해주세요.',
		},
	},
	passwordInLogin: {
		required: '비밀번호를 입력해 주세요.',
		pattern: {
			value: VALIDATE_REGEX.password,
			message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
		},
	},
	passwordInSignup: {
		required: '비밀번호를 입력해 주세요.',
		pattern: {},
	},
	checkboxSignup: {
		required: '이용약관에 동의해 주세요.',
		pattern: {
			value: VALIDATE_REGEX.checked,
			message: '이용약관에 동의해 주세요.',
		},
	},
};
