<template>
	<div class="content mt-3">
		<div class="row justify-content-center">


			<div class="login-block">
				<div class="login-block__title">
					Регистрация
				</div>
				<div class="login-block__form">
					<div class="form">
						<div class="login-block__form__item">
							<label>ФИО</label>
							<input type="text" class="form-control" name="fio" placeholder="ФИО" v-model="fio" :class="{'is-invalid': errors.fio}">
							<span class="text-danger" v-if="errors.fio">{{ errors.fio[0] }}</span>
						</div>
						<div class="login-block__form__item">
							<label>Почта</label>
							<input type="text" class="form-control" name="login" placeholder="Почта" v-model="email" :class="{'is-invalid': errors.email}">
							<span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
						</div>
						<div class="login-block__form__item">
							<label>Пароль</label>
							<input type="password" class="form-control" name="password" placeholder="Пароль" v-model="password" :class="{'is-invalid': errors.password}">
							<span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
						</div>
						<div class="login-block__form__item">
							<label>Повторите пароль</label>
							<input type="password" class="form-control" name="confirm_password" placeholder="Повторите пароль" v-model="confirm_password" :class="{'is-invalid': errors.confirm_password}">
							<span class="text-danger" v-if="errors.confirm_password">{{ errors.confirm_password }}</span>
						</div>
						<div class="login-block__form__item" v-if="!loading">
							<button type="submit" class="btn btn-dark btn-block" @click="register">Зарегистрироваться</button>
						</div>
					</div>
				</div>
				<div class="login-block__form__link">
					Уже есть аккаунт? <a href="/auth/login" class="link">Вход</a>
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
			password: '',
			confirm_password: '',
			fio: '',
			errors: [],
			loading: false
		}
	},
	methods: {
		async register() {

			if(this.password !== this.confirm_password) {
				this.errors = {
					confirm_password: 'Пароли не совпадают'
				}
				return;
			}

			this.message = '';
			this.errors = {};
			this.loading = true;
			const response = (await this.$axios.post('/auth/register', {
				email: this.email,
				fio: this.fio,
				password: this.password
				})).data;

			if(response.code === 200) {
				this.$toast.success(response.message);
				this.errors = {}
				this.email = '';
				this.fio = '';
				this.password = '';
				this.confirm_password = '';
				this.$router.push('/auth/login');
			} else {
				this.errors = response.message;
			}
			
			this.loading = false;
		},
	}
}
</script>