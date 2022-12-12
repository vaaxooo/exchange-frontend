<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Контакты</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="form-group mb-4">
						<a href="/admin/contacts/create" class="btn btn-success">
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
								</tr>
							</thead>
							<tbody v-if="Object.keys(contacts).length > 0">
								<tr v-for="contact in contacts" :key="contact.id">
									<th scope="row">{{ contact.id }}</th>
									<td>{{ contact.name }}</td>
									<td>
										{{ contact.link }}
									</td>
									<td>
										<a :href="'/admin/contacts/' + contact.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon" @click="deleteContact(contact.id)">
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
			contacts: []
		}
	},
	async fetch() {
		const response = (await this.$axios.get('/admin/contacts')).data
		this.contacts = response.data.data
	},
	methods: {
		async deleteContact(id) {
			const response = (await this.$axios.delete('/admin/contacts/' + id)).data
			if (response.code === 200) {
				this.$toast.success(response.message)
				this.contacts = this.contacts.filter(contact => contact.id !== id)
			} else {
				this.$toast.error(response.message)
			}
		}
	}
}

</script>