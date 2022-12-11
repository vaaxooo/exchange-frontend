<template>
	<div class="content mt-3">
		<div class="row justify-content-center">

			<div class="login-block">
				<div class="login-block__title">
					Восстановление пароля
				</div>
				<div class="login-block__subtitle">
					Введите почту, на которую была зарегистрирована учетная запись
				</div>
				<div class="login-block__form">
					<div class="form">
						<div class="login-block__form__item">
							<label>Почта</label>
							<input type="email" class="form-control form-control-lg " id="email" v-model="email" placeholder="E-mail" :class="{'is-invalid': errors.email}">
							<span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
						</div>
						<div class="login-block__form__item" v-if="!loading">
							<button type="submit" class="btn btn-dark btn-block" @click="send">Отправить код</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	auth: false,
	data() {
		return {
			email: '',
			errors: [],
			loading: false
		}
	},
	methods: {
		async send() {
			this.errors = [];
			this.loading = true;
			const response = (await this.$axios.post('/auth/password/send', {
				email: this.email
			})).data;
			if (response.status === 'success') {
				this.$toast.success(response.message);
				this.email = '';
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