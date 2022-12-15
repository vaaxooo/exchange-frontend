<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Динамические страницы</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="form-group mb-4">
						<a href="/admin/pages/create" class="btn btn-success">
							<span class="material-symbols-outlined">add</span> Добавить
						</a>
					</div>

					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Название страницы</th>
									<th scope="col">Ссылка</th>
									<th scope="col">Статус</th>
								</tr>
							</thead>
							<tbody v-if="Object.keys(pages).length > 0">
								<tr v-for="page in pages" :key="page.id">
									<th scope="row">{{ page.id }}</th>
									<td>{{ page.title }}</td>
									<td>
										{{ page.slug }}
									</td>
									<td class="text-success fw-bold" v-if="page.is_published">Активный</td>
									<td class="text-danger fw-bold" v-else>Не активный</td>
									<td>
										<a :href="'/admin/pages/' + page.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon" @click="deletePage(page.id)">
											<span class="material-icons">delete</span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
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
			pages: []
		}
	},
	async fetch() {
		const response = (await this.$axios.get('/admin/pages')).data
		this.pages = response.data.data
	},
	methods: {
		async deletePage(id) {
			const response = (await this.$axios.delete('/admin/pages/' + id)).data
			if (response.code === 200) {
				this.$toast.success(response.message)
				this.pages = this.pages.filter(page => page.id !== id)
			} else {
				this.$toast.error(response.message)
			}
		}
	}
}

</script>