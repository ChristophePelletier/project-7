import api from '@/services/api'
export default {
	signup(identification) {
		return api().post('signup', identification)
	},
}
/*
auth.signup({
	email: 'test@test.gmail',
	password: '123456',
})
*/
