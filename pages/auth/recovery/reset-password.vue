<template>
	<div class="content mt-3">
		<div class="row justify-content-center">


			<div class="login-block">
				<div class="login-block__title">
					Сброс пароля
				</div>
				<div class="login-block__form">
					<div class="form">
						<div class="login-block__form__item">
							<label>Новый пароль</label>
							<input type="password" class="form-control" id="new_password" v-model="new_password" :class="{'is-invalid': errors.new_password}">
							<span v-if="errors.new_password" class="text-danger">{{ errors.new_password[0] }}</span>
						</div>
						<div class="login-block__form__item">
							<label>Повторите пароль</label>
							<input type="password" class="form-control" id="confirm_password" v-model="confirm_password" :class="{'is-invalid': errors.confirm_password}">
							<span v-if="errors.confirm_password" class="text-danger">{{ errors.confirm_password[0] }}</span>
						</div>
						<div class="login-block__form__item">
							<button type="submit" class="btn btn-dark btn-block" @click="send">Изменить</button>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script>
export default {
	name: 'change-password',
	auth: false,
	data() {
		return {
			new_password: '',
			confirm_password: '',
			errors: [],
			loading: false
		}
	},
	methods: {
		async send() {
			if(this.password !== this.confirm_password) {
				this.errors = {
					confirm_password: 'Пароли не совпадают'
				}
				return;
			}

			if(!this.$route.query.email || !this.$route.query.code) {
				this.$router.push('/')
			}

			this.errors = [];
			this.loading = true;
			const response = (await this.$axios.post('/auth/password/reset', {
				password: this.new_password,
				email: this.$route.query.email,
				code: this.$route.query.code
			})).data;
			if (response.code === 200) {
				this.$toast.success(response.message);
				this.$router.push('/');
			} else {
				if(response.hasOwnProperty('errors')) {
					this.errors = response.errors;
				} else {
					this.$toast.error(response.message);
				}
			}
			this.loading = false;
		}
	}
}
</script>