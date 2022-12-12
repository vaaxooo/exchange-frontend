<template>               
	<div class="row justify-content-center">
		<div class="header-content" v-if="Object.keys(page).length > 0">
			<h1>Страница "{{ page.title }}"</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(page).length > 0">

						<div class="row">

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Название</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="Название страницы" v-model="page.title" :class="{'is-invalid': errors.title}">
										<span class="invalid-feedback" v-if="errors.title">
											{{ errors.title[0] }}
										</span>
									</div>
								</div>

								<div class="transaction-info-block__item mt-3">
									<button type="submit" class="btn btn-dark btn-block" @click="editPage">Сохранить</button>
								</div>


								<hr>

								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Статус</div>
									<div class="transaction-info-block__item-value fw-bold text-success" v-if="page.is_published">Активный</div>
									<div class="transaction-info-block__item-value fw-bold text-danger" v-else>Неактивный</div>

									<button type="button" class="btn btn-danger btn-sm my-2" @click="active" v-if="page.is_published">Отключить</button>
									<button type="button" class="btn btn-success btn-sm my-2" @click="active" v-else>Включить</button>
								</div>
							</div>

							<div class="col-md-8">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Содержимое страницы</div>
									<div class="transaction-info-block__item-value">
										<textarea class="form-control" placeholder="Начните вводить.." rows="15" v-model="page.content" :class="{'is-invalid': errors.content}"></textarea>
										<span class="invalid-feedback" v-if="errors.content">
											{{ errors.content[0] }}
										</span>
									</div>
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
	layout: "admin",
	auth: true,
	data() {
		return {
			page: [],
			errors: []
		}
	},
	async fetch() {
		await this.fetchPage()
	},
	methods: {
		async fetchPage() {
			const response = (await this.$axios.get(`/admin/pages/${this.$route.params.id}`)).data
			if(response.code === 200) {
				this.page = response.data
			} else {
				this.$toast.error(response.message)
			}
		},

		async editPage() {
			const response = (await this.$axios.patch(`/admin/pages/${this.$route.params.id}`, {
				title: this.page.title,
				content: this.page.content
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
			} else {
				this.errors = response.errors
			}
		},

		async active() {
			const response = (await this.$axios.get(`/admin/pages/${this.$route.params.id}/active`)).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.page.is_published = !this.page.is_published
			} else {
				this.$toast.error(response.message)
			}
		}
	}
}

</script>