<template>
	
	<div class="content mt-3">
		<div class="row justify-content-center">
			<div class="login-block">
				<div class="login-block__title">
					Подтверждение почты
				</div>
				<div class="login-block__form">
					<div class="form">
						<div class="login-block__form__item">
							<label>Введите полученный код</label>
							<input type="email" class="form-control" name="code" placeholder="Код подтверждения" v-model="code">
						</div>
						<div class="login-block__form__item">
							<button type="submit" class="btn btn-dark btn-block" @click="confirm">Подтвердить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>

export default {
	name: 'confirm',
	auth: true,
	data() {
		return {
			code: '',

			loading: false,
		}
	},

	methods: {
		async confirm() {
			this.loading = true
			const response = (await this.$axios.$post('/auth/verification/check', {
					code: this.code,
				})).data
			if(response.code === 200) {
				this.$toast.success('Почта успешно подтверждена')
				this.$router.push('/')
			} else {
				this.$toast.error('Ошибка подтверждения почты')
			}
			this.loading = false
		},
	},
}

</script>
