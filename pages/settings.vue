<template>
	<div class="content mt-3">
		<div class="row">
			<div class="col-md-12">

				<div class="title">Изменение пароля</div>

				<div class="card mb-5">
					<div class="card-body p-3">

						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label>Текущий</label>
									<input type="text" class="form-control" placeholder="Текущий пароль" v-model="old_password" :class="{'is-invalid': errors.oldPassword}">
									<span class="invalid-feedback" v-if="errors.oldPassword">{{ errors.oldPassword[0] }}</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Новый</label>
									<input type="text" class="form-control" placeholder="Новый пароль" v-model="new_password" :class="{'is-invalid': errors.newPassword}">
									<span class="invalid-feedback" v-if="errors.newPassword">
										{{ errors.newPassword[0] }}
									</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Повторите пароль</label>
									<input type="password" class="form-control" placeholder="Повторите пароль" v-model="confirm_password" :class="{'is-invalid': errors.confirmPassword}">
									<span class="invalid-feedback" v-if="errors.confirmPassword">
										{{ errors.confirmPassword[0] }}
									</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group mx-auto m-auto vertical-with-input">
									<button class="btn btn-dark" type="submit" @click="changePassword">Изменить</button>
								</div>
							</div>

						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'settings',
	auth: true,
	data() {
		return {
			old_password: '',
			new_password: '',
			confirm_password: '',

			errors: []
		}
	},
	methods: {
		async changePassword() {
			if (this.new_password !== this.confirm_password) {
				this.$notify({
					type: 'error',
					title: 'Ошибка',
					text: 'Пароли не совпадают'
				})
				return
			}
			const response = (await this.$axios.post('/user/change-password', {
				oldPassword: this.old_password,
				newPassword: this.new_password,
				confirmPassword: this.confirm_password
			})).data
			if (response.code === 200) {
				this.$toast.success('Пароль успешно изменен')
			} else {
				if(response.hasOwnProperty('errors')) {
					this.errors = response.errors
				} else {
					this.$toast.error(response.message)
				}
			}
		}
	}
}
</script>
