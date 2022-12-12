<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Добавление новой страницы</h1>
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
										<input type="text" class="form-control" placeholder="Название страницы" v-model="page.title" :class="{'is-invalid': errors.title}">
										<span class="invalid-feedback" v-if="errors.title">
											{{ errors.title[0] }}
										</span>
									</div>
								</div>

								<div class="transaction-info-block__item mt-3">
									<button type="submit" class="btn btn-dark btn-block" @click="createPage">Сохранить</button>
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
	methods: {
		async createPage() {
			const response = await this.$axios.post('/admin/pages', {
				title: this.page.title,
				content: this.page.content
			})
			if(response.code === 200) {
				this.$toast.success('Страница успешно создана')
				this.$router.push('/admin/pages')
			} else {
				this.errors = response.data.errors
			}
		}
	}
}

</script>