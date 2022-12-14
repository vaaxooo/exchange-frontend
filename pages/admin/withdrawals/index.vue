<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Пополнения и выплаты</h1>
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
									<th scope="col">Сумма</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="deposit in deposits" :key="deposit.id">
									<th scope="row">{{ deposit.id }}</th>
									<td>{{ deposit.user.fio ?? deposit.user.email }}</td>
									<td class="text-success fw-bold" v-if="deposit.type === 'deposit'">Пополнение</td>
									<td class="text-danger fw-bold" v-if="deposit.type === 'withdrawal'">Вывод</td>
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
									<td>
										<a :href="'/admin/withdrawals/' + deposit.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon">
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
import formatDate from "~/plugins/formatDate";

export default {
	layout: "admin",
	data() {
		return {
			deposits: [],
			formatDate
		};
	},
	async fetch() {
		await this.fetchDeposits();
	},

	methods: {
		async fetchDeposits() {
			const response = (await this.$axios.get("/admin/payments")).data;
			this.deposits = response.data.data;
		}
	}
}

</script>