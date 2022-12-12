<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Транзакции</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Пользователь</th>
									<th scope="col">Тип</th>
									<th scope="col">Криптовалюта</th>
									<th scope="col">Количество</th>
									<th scope="col">Цена</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="transaction in transactions" :key="transaction">
									<th scope="row">{{ transaction.id }}</th>
									<td>{{ transaction.user.email }}</td>
									<td class="text-success fw-bold" v-if="transaction.type === 'buy'">Покупка</td>
									<td class="text-danger fw-bold" v-else>Продажа</td>
									<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
										<img :src="'/icons/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coinFrom.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_to.name }}
									</td>
									<td class="transaction-info-block__item-value" v-else>
										<img :src="'/icons/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coinTo.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_from.name }}
									</td>
									<td v-if="transaction.type === 'buy'">{{ transaction.amountFrom }}</td>
									<td v-else>{{ transaction.amountTo }}</td>
									<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountFrom).toFixed(2) }}
									</td>
									<td class="transaction-info-block__item-value" v-else>
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountTo).toFixed(2) }}
									</td>

									<td class="text-success fw-bold" v-if="transaction.status === 'success'">Успешно</td>
									<td class="text-danger fw-bold" v-if="transaction.status === 'failed'">Заблокировано</td>
									<td class="text-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</td>
									<td class="text-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</td>
									<td class="text-danger fw-bold" v-if="transaction.status === 'unpaid'">Неоплачено</td>
									<td class="text-success fw-bold" v-if="transaction.status === 'paid'">Успешно</td>

									<td>{{ formatDate(transaction.created_at) }}</td>
									<td>
										<a :href="'/admin/transactions/' + transaction.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
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
import formatDate from "@/plugins/formatDate";

export default {
	layout: "admin",
	auth: true,
	data() {
		return {
			transactions: [],

			formatDate
		};
	},
	async fetch() {
		await this.fetchTransactions();
	},
	methods: {
		async fetchTransactions() {
			const response = (await this.$axios.get("/admin/transactions")).data;
			this.transactions = response.data.data;
			console.log(this.transactions);
		},
	},
}

</script>