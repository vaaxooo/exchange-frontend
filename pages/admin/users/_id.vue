<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Пользователь #1</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Номер пользователя</div>
								<div class="transaction-info-block__item-value">#{{ user.id }}</div>
							</div>
						</div>
				
						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">ФИО</div>
								<div class="transaction-info-block__item-value">{{ user.fio }}</div>
							</div>
						</div>

						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Почта</div>
								<div class="transaction-info-block__item-value">{{ user.email }}</div>
							</div>
						</div>

						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Номер телефона</div>
								<div class="transaction-info-block__item-value">{{ user.phone }}</div>
							</div>
						</div>

						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Дата регистрации</div>
								<div class="transaction-info-block__item-value">{{ formatDate(user.created_at) }}</div>
							</div>
						</div>

						<div class="col-md-4">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Статус</div>
								<div class="transaction-info-block__item-value fw-bold text-success" v-if="!user.ban">Активный</div>
								<div class="transaction-info-block__item-value fw-bold text-danger" v-else>Заблокирован</div>

								<button type="button" class="btn btn-danger btn-sm my-2" @click="boolBan" v-if="!user.ban">Заблокировать</button>
								<button type="button" class="btn btn-success btn-sm my-2" @click="boolBan" v-else>Разблокировать</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-md-3">
							<div class="transaction-info-block__item">
								<div class="transaction-info-block__item-title">Баланс пользователя</div>
								<div class="transaction-info-block__item-value">
									<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ user.balance }}
								</div>
							</div>
						</div>

						<div class="col-md-4">
							<div class="row">
								<div class="form-group col-8">
									<label for="inputAddress">Сумма</label>
									<input type="text" class="form-control" id="inputAddress" placeholder="Сумма" v-model="newBalance">
								</div>

								<div class="form-group col-4 m-auto mx-auto vertical-with-input">
									<button class="btn btn-dark" @click="setBalance">Сохранить</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label for="inputAddress">Новый пароль</label>
								<input type="password" class="form-control" id="inputAddress" placeholder="Новый пароль" v-model="newPassword">
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label for="inputAddress">Повторите пароль</label>
								<input type="password" class="form-control" id="inputAddress" placeholder="Повторите пароль" v-model="confirmPassword">
							</div>
						</div>

						<div class="col-md-4 mx-auto m-auto vertical-with-input">
							<div class="form-group">
								<button class="btn btn-dark" @click="setPassword">Изменить</button>
							</div>
						</div>

					</div>
				</div>
			</div>

			




			<div class="card">
				<div class="card-body">
					<h5>Кошельки</h5>
					<div class="row" v-for="wallet in wallets" :key="wallet.id">
						<div class="col-md-2" v-if="wallet.coin.symbol !== 'usdt'">
							<div class="form-group transaction-info-block__item-value mt-1">
								<img :src="'/icons/' + (wallet.coin.symbol).toLowerCase() + '.png'" alt="btc" class="transaction-info-block__item-value-icon">
								{{ wallet.coin.name }}
							</div>
						</div>
						<div class="col-md-4" v-if="wallet.coin.symbol !== 'usdt'">
							<div class="form-group">
								<input type="number" class="form-control" v-model="wallet.balance" @change="changeWallet(wallet.id)">
							</div>
						</div>

					</div>
				</div>
			</div>


				<div class="card">
					<div class="card-body">
						<div class="title mt-0">История пополнений</div>
						<div class="table-responsive">
							<table class="table table-hover">
								<thead>
									<tr>
										<th scope="col">ID</th>
										<th scope="col">Сумма</th>
										<th scope="col">Статус</th>
										<th scope="col">Дата</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="deposit in deposits" :key="deposit.id">
										<th scope="row">{{ deposit.id }}</th>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ deposit.amount }}
										</td>
										<td class="text-success fw-bold" v-if="deposit.status === 'success'">Успешно</td>
										<td class="text-danger fw-bold" v-if="deposit.status === 'failed'">Заблокировано</td>
										<td class="text-warning fw-bold" v-if="deposit.status === 'pending'">Ожидание оплаты</td>
										<td class="text-secondary fw-bold" v-if="deposit.status === 'processing'">В обработке</td>
										<td class="text-danger fw-bold" v-if="deposit.status === 'unpaid'">Неоплачено</td>
										<td class="text-success fw-bold" v-if="deposit.status === 'paid'">Успешно</td>
										<td>{{ formatDate(deposit.created_at) }}</td>
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
	layout: "admin",
	auth: true,
	data() {
		return {
			user: [],
			wallets: [],
			deposits: [],
			formatDate,

			newBalance: '',

			newPassword: '',
			confirmPassword: ''
		}
	},
	async fetch() {
		await this.fetchUser()
		await this.getWallets(),
		await this.getTransactions()
	},
	methods: {
		async fetchUser() {
			const response = (await this.$axios.get(`/admin/users/${this.$route.params.id}`)).data
			this.user = response.data
		},

		async getTransactions() {
			const response = (await this.$axios.get(`/admin/users/${this.$route.params.id}/transactions`)).data
			this.deposits = response.data
		},

		async boolBan() {
			const response = (await this.$axios.get(`/admin/users/${this.$route.params.id}/ban`)).data
			this.user.ban = !this.user.ban
		},

		async setBalance() {
			const response = (await this.$axios.post(`/admin/users/${this.$route.params.id}/balance`, {
				amount: this.newBalance
			})).data
			if(response.code === 200) {
				this.user.balance = +this.newBalance
				this.$toast.success(response.message)
			} else {
				this.$toast.error(response.data.amount)
			}

		},

		async setPassword() {
			if(this.newPassword !== this.confirmPassword) return this.$toast.error('Пароли не совпадают')

			const response = (await this.$axios.post(`/admin/users/${this.$route.params.id}/change-password`, {
				password: this.newPassword,
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
			} else {
				this.$toast.error(response.data.password)
			}
		},

		async getWallets() {
			const response = (await this.$axios.get(`/admin/users/${this.$route.params.id}/wallets`)).data
			this.wallets = response.data
		},

		async changeWallet(wallet_id) {
			const response = (await this.$axios.post(`/admin/users/${this.$route.params.id}/wallets/set-balance`, {
				coin_id: this.wallets.find(wallet => wallet.id === wallet_id).coin_id,
				amount: this.newBalance = this.wallets.find(wallet => wallet.id === wallet_id).balance
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
			} else {
				this.$toast.error(response.data.balance)
			}
		} 
	}
}

</script>