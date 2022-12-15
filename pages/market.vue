<template>

	<div class="content mt-3">
		<div class="row">

			<div class="coins-list row px-0 mx-0 mb-3" v-if="wallets">
				<my-coins v-for="wallet in wallets" :key="wallet.id" :wallet="wallet" />
			</div>


			<div class="col-md-4">
				<exchange-block :wallets="wallets" />
			</div>

			<div class="col-md-8">
				<chart />
			</div>


			<div class="col-md-12">


				<div class="title">Последние операции</div>
				<div class="card mb-5">
					<div class="card-body p-3">
						<div class="table-responsive">
							<table class="table table-hover">
								<thead>
									<tr>
										<th scope="col">Криптовалюта</th>
										<th scope="col">Тип</th>
										<th scope="col">Количество</th>
										<th scope="col">Цена</th>
										<th scope="col">Комиссия</th>
										<th scope="col">Статус</th>
										<th scope="col">Дата</th>
									</tr>
								</thead>
								<tbody v-if="Object.keys(transactions).length > 0">
									<tr v-for="transaction in transactions" :key="transaction.id">
										<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
											<img :src="'/icons/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coin_from.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_to.name }}
										</td>
										<td class="transaction-info-block__item-value" v-else>
											<img :src="'/icons/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coin_to.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_from.name }}
										</td>

										<td class="text-success fw-bold" v-if="transaction.type === 'buy'">Покупка</td>
										<td class="text-danger fw-bold" v-else>Продажа</td>

										<td v-if="transaction.type === 'buy'">{{ transaction.amountTo }}</td>
										<td v-else>{{ transaction.amountFrom }}</td>

										<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountFrom).toFixed(2) }}
										</td>
										<td class="transaction-info-block__item-value" v-else>
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountTo).toFixed(2) }}
										</td>

										<td>{{ transaction.commission }}</td>

										<td class="text-success fw-bold" v-if="transaction.status === 'success'">Успешно</td>
										<td class="text-danger fw-bold" v-if="transaction.status === 'failed'">Заблокировано</td>
										<td class="text-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</td>
										<td class="text-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</td>
										<td class="text-danger fw-bold" v-if="transaction.status === 'unpaid'">Неоплачено</td>
										<td class="text-success fw-bold" v-if="transaction.status === 'paid'">Успешно</td>

										<td>{{ formatDate(transaction.created_at) }}</td>
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
import formatDate from '@/plugins/formatDate'

export default {
  	name: 'IndexPage',
  	auth: true,
	data() {
		return {
			wallets: [],
			transactions: [],

			formatDate
		}
	},
	async fetch() {
		await this.getWallets()
		await this.getTransactions()
	},
	methods: {
		async getWallets() {
			const response = (await this.$axios.get('/wallets')).data
			this.wallets = response.data.data
		},

		async getTransactions() {
			const response = (await this.$axios.get('/transactions')).data
			this.transactions = response.data
		}
	}
}
</script>
