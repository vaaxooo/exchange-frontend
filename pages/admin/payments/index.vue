<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Кошельки для получения средств</h1>
		</div>

		<div class="col-12">
			<div class="card">
				<div class="card-body row">
					<div class="col-md-4">
						<div class="form-group">
							<label for="floatingInput">Название метода</label>
							<input type="text" class="form-control" id="floatingInput" placeholder="Название метода" v-model="method.name">
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="floatingInput">Номер получателя</label>
							<input type="text" class="form-control" id="floatingInput" placeholder="Номер получателя" v-model="method.address">
						</div>
					</div>
					<div class="col-md-4 m-auto mx-auto">
						<div class="form-group vertical-align-item">
							<button type="submit" class="btn btn-success" @click="addMethod">Добавить</button>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Название метода</th>
									<th scope="col">Номер получателя</th>
									<th scope="col">Статус</th>
								</tr>
							</thead>
							<tbody v-if="Object.keys(methods).length > 0">
								<tr v-for="method in methods" :key="method.id">
									<th scope="row">{{ method.id }}</th>
									<td>{{ method.name }}</td>
									<td>{{ method.address }}</td>
									<td class="text-success fw-bold" v-if="method.is_active">Активный</td>
									<td class="text-danger fw-bold" v-else>Отключён</td>
									<td>
										<button class="btn btn-light btn-sm btn-icon" @click="changeMethodStatus(method.id)">
											<span class="material-icons">refresh</span>
										</button>
										<button class="btn btn-danger btn-sm btn-icon" @click="deleteMethod(method.id)">
											<span class="material-icons">delete</span>
										</button>
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
			methods: [],
			method: {
				name: '',
				address: ''
			},

			errors: []
		}
	},
	async fetch() {
		await this.fetchMethods()
	},
	methods: {
		async fetchMethods() {
			const response = (await this.$axios.get('/admin/pay-methods')).data
			this.methods = response.data
		},

		async addMethod() {
			const response = (await this.$axios.post('/admin/pay-methods', this.method)).data
			if(response.code == 200) {
				this.$toast.success(response.message)
				this.methods.push(response.data)
				this.method.name = ''
				this.method.address = ''
			} else {
				this.errors = response.errors
			}
		},

		async deleteMethod(method_id) {
			const response = (await this.$axios.delete('/admin/pay-methods/' + method_id)).data
			if(response.code === 200){
				this.methods = this.methods.filter(method => method.id !== method_id)
				this.$toast.success(response.message)
			}
		},

		async changeMethodStatus(method_id) {
			const response = (await this.$axios.get('/admin/pay-methods/' + method_id + '/active')).data
			if(response.code === 200){
				this.methods.filter(method => {
					if(method.id === method_id){
						method.is_active = !method.is_active
					}
				})
				this.$toast.success(response.message)
			}
		}
	}
}

</script>