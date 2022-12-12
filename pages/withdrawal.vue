<template>
	<div class="content mt-3">
		<div class="row">

			<div class="col-md-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Вывод средств</h5>
						<p class="card-text">Вывод средств на крипто-кошелёк</p>
						<div class="form-group">
							<label>Сумма</label>
							<div class="input-group">

								<input type="text" class="form-control form-control-lg" placeholder="Сумма" v-model="amount" :class="{'is-invalid': errors.amount}">
								<div class="input-group-append">
									<span class="input-group-text">USDT</span>
								</div>
							</div>
							<span class="invalid-feedback" v-if="errors.amount">
								{{ errors.amount }}
							</span>
						</div>

						<div class="form-group">
							<label>Адрес получателя</label>
							<input type="text" class="form-control form-control-lg" placeholder="Адрес получателя" v-model="wallet" :class="{'is-invalid': errors.wallet}">
							<span class="invalid-feedback" v-if="errors.wallet">
								{{ errors.wallet[0] }}
							</span>
						</div>

						<div class="form-group">
							<button class="btn btn-dark" @click="create">Вывести</button>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-8">
				<div class="card">
					<div class="card-body">
						<div class="title mt-0">История выводов</div>
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
									<tr v-for="withdrawal in withdrawals" :key="withdrawal.id" :title="withdrawal.comment">
										<th scope="row">{{ withdrawal.id }}</th>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ withdrawal.amount }}
										</td>
										<td class="text-success fw-bold" v-if="withdrawal.status === 'success'">Успешно</td>
										<td class="text-danger fw-bold" v-if="withdrawal.status === 'failed'">Заблокировано</td>
										<td class="text-warning fw-bold" v-if="withdrawal.status === 'pending'">Ожидание оплаты</td>
										<td class="text-secondary fw-bold" v-if="withdrawal.status === 'processing'">В обработке</td>
										<td class="text-danger fw-bold" v-if="withdrawal.status === 'unpaid'">Неоплачено</td>
										<td class="text-success fw-bold" v-if="withdrawal.status === 'paid'">Успешно</td>
										<td>{{ formatDate(withdrawal.created_at) }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import formatDate from "~/plugins/formatDate"

export default {
	name: 'pay',
	auth: true,
	data() {
		return {
			amount: 0,
			wallet: '',

			withdrawals: [],

			formatDate: formatDate,
			errors: []
		}
	},

	async fetch() {
		await this.fetchWithdrawals()
	},

	methods: {
		async create() {
			const response = (await this.$axios.post('/payments/withdrawal', {
				amount: this.amount,
				wallet: this.wallet,
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.amount = 0
				this.wallet = ''
				this.errors = []
				await this.fetchWithdrawals()
			} else {
				this.$toast.error('Недостаточно средств на балансе для вывода.')
				this.errors = response.errors
			}
		},

		async fetchWithdrawals() {
			const response = (await this.$axios.get('/payments/withdrawals')).data
			if(response.code === 200) {
				this.withdrawals = response.data.data
			} else {
				this.$toast.error(response.message)
			}
		}
	}
}
</script>