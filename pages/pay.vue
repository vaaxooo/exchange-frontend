<template>
	<div class="content mt-3">
		<div class="row">

			<div class="col-md-4">
				<div class="card mb-2">
					<div class="card-body">
						<h5 class="card-title">Пополнение баланса</h5>
						<div class="form-group">
							<label>Сумма</label>
							<div class="input-group">
								<input type="text" class="form-control form-control-lg" placeholder="Сумма" v-model="amount" :class="{'is-invalid': errors.amount}">
								<div class="input-group-append">
									<span class="input-group-text">USDT</span>
								</div>
							</div>
							<div class="invalid-feedback" v-if="errors.amount">{{ errors.amount }}</div>
						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-dark" @click="pay">Пополнить</button>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-8">
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

			<div class="modal show fade" style="display:block" v-if="modal">
				<div class="modal__overlay" @click="closeModal"></div>
				<div class="modal__body">
					<div class="modal__content">
						<div class="modal__header">
							<div class="modal__title">Пополнение</div>
							<div class="modal__close" @click="closeModal"></div>
						</div>
						<div class="modal__text">
							<div class="methods-list mt-2" v-if="Object.keys(methods).length > 0">
								Выберите удобный способ оплаты и переведите средства на указанный номер карты.
								<ul class="methods mt-3">
									<li class="methods__item" v-for="method in methods" :key="method.id">
										<b>{{ method.name }}:</b> {{ method.address }} 
									</li>
								</ul>
							</div>

							<div class="methods-list mt-2" v-if="Object.keys(methods).length === 0">
								Способы оплаты отсутствуют
							</div>

							<div class="mt-3 pay-total-amount">
								<b>Сумма к оплате:</b> {{ amount }} USDT
							</div>
						</div>
						<div class="modal__footer mt-4">
							<button class="btn btn-dark" @click="closeModal">Закрыть</button>
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
			amount: 30,
			temp_amount: 0,

			deposits: [],

			formatDate: formatDate,
			errors: [],

			methods: [], 
			modal: false,
		}
	},

	watch: {
		amount() {
			this.errors = []
			if(this.amount < 30) {
				this.errors['amount'] = 'Минимальная сумма пополнения 30 USDT'
			}
		}
	},

	async fetch() {
		await this.fetchDeposits()
		await this.fetchMethods()
	},

	methods: {
		async pay() {
			if(this.amount < 30) {
				this.errors['amount'] = ['Минимальная сумма пополнения 30 USDT']
				return
			}

			const response = (await this.$axios.post('/payments/deposit', {
				amount: this.amount
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.temp_amount = this.amount
				this.amount = 30
				this.errors = []
				await this.fetchDeposits()
				this.modal = true
			} else {
				this.errors = response.errors
			}
		},

		async fetchDeposits() {
			const response = (await this.$axios.get('/payments/deposits')).data
			if(response.code === 200) {
				this.deposits = response.data.data
			} else {
				this.$toast.error(response.message)
			}
		},

		async fetchMethods() {
			const response = (await this.$axios.get('/payments/methods')).data
			if(response.code === 200) {
				this.methods = response.data
			} else {
				this.$toast.error(response.message)
			}
		},

		closeModal() {
			this.modal = false
		}
	}
}
</script>