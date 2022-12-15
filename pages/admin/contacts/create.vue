<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Добавление нового контакта</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block">

						<div class="row">

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Название</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="Название ссылки" v-model="contact.name" :class="{'is-invalid': errors.name}">
										<span class="invalid-feedback" v-if="errors.name">
											{{ errors.name[0] }}
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Ссылка</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="Ссылка" v-model="contact.link" :class="{'is-invalid': errors.link}">
										<span class="invalid-feedback" v-if="errors.link">
											{{ errors.link[0] }}
										</span>
									</div>
								</div>
							</div>

							<div class="transaction-info-block__item mt-3">
								<button type="submit" class="btn btn-dark" @click="createContact">Сохранить</button>
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
	layout: "admin",
	auth: true,
	data() {
		return {
			contact: [],

			errors: []
		}
	},
	methods: {
		async createContact() {
			const response = (await this.$axios.post('/admin/contacts', {
				name: this.contact.name,
				link: this.contact.link
			})).data
			if(response.code === 200) {
				this.$toast.success('Контакт успешно создан')
				this.$router.push('/admin/contacts')
			} else {
				this.errors = response.errors
			}
		}
	}
}

</script>