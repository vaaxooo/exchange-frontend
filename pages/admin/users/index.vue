<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Пользователи</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Почта</th>
									<th scope="col">Баланс</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата регистрации</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="user in users" :key="user.id">
									<th scope="row">{{ user.id }}</th>
									<td>{{ user.email }}</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +user.balance }}
									</td>
									<td class="text-success fw-bold" v-if="user.ban === 0">Активный</td>
									<td class="text-danger fw-bold" v-else>Заблокирован</td>
									<td>{{ formatDate(user.created_at) }}</td>
									<td>
										<a :href="'/admin/users/' + user.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<button class="btn btn-danger btn-sm btn-icon" @click="deleteUser(user.id)" v-if="user.role !== 'admin'">
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
import formatDate from '~/plugins/formatDate.js'

export default {
	name: "usersIndex",
	layout: "admin",
	data() {
		return {
			users: [],

			formatDate
		}
	},
	async fetch() {
		await this.fetchUsers()
	},
	methods: {
		async fetchUsers() {
			const response = (await this.$axios.get('/admin/users')).data
			this.users = response.data.data
		},

		async deleteUser(user) {
			const response = (await this.$axios.delete('/admin/users/' + user)).data
			if (response.code === 200) {
				this.$toast.success(response.message)
				this.users = this.users.filter(u => u.id !== user)
			} else {
				this.$toast.error(response.message)
			}
		}
	}
}

</script>