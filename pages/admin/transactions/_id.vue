<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Транзакция #1</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(transaction).length > 0">

						<div class="row">
							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер транзакции</div>
									<div class="transaction-info-block__item-value">#{{ transaction.id }}</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Hash транзакции</div>
									<div class="transaction-info-block__item-value">{{ transaction.hash }}</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Тип транзакции</div>
									<div class="transaction-info-block__item-value fw-bold text-success" v-if="transaction.type === 'buy'">
										Покупка
									</div>
									<div class="transaction-info-block__item-value fw-bold text-danger" v-else>
										Продажа
									</div>
								</div>
							</div>



							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Пользователь</div>
									<div class="transaction-info-block__item-value">
										<a :href="'/admin/users/' + transaction.user_id" class="transaction-info-block__item-value-link">{{ transaction.user.email }}</a>
									</div>
								</div>
							</div>


							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата создания транзакции</div>
									<div class="transaction-info-block__item-value">
										{{ formatDate(transaction.created_at) }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Криптовалюта</div>
									<div class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
										<img :src="'/icons/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coin_to.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_to.name }}
									</div>
									<div class="transaction-info-block__item-value" v-else>
										<img :src="'/icons/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coin_from.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_from.name }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Количество</div>
									<div class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
										{{ transaction.amountTo }}
									</div>
									<div class="transaction-info-block__item-value" v-else>
										{{ transaction.amountFrom }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">К получению</div>
									<div class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
										<img :src="'/icons/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coin_from.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.amountFrom }}
									</div>
									<div class="transaction-info-block__item-value" v-else>
										<img :src="'/icons/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coin_to.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.amountTo }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Статус транзакции</div>
									<div class="transaction-info-block__item-value">
										<span class="badge bg-success fw-bold" v-if="transaction.status === 'success'">Успешно</span>
										<span class="badge bg-danger fw-bold" v-if="transaction.status === 'failed'">Заблокировано</span>
										<span class="badge bg-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</span>
										<span class="badge bg-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</span>
										<span class="badge bg-danger fw-bold" v-if="transaction.status === 'unpaid'">Неоплачено</span>
										<span class="badge bg-success fw-bold" v-if="transaction.status === 'paid'">Успешно</span>
									</div>
								</div>
							</div>

							<div class="col-md-8 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Комментарий к статусу</div>
									<div class="transaction-info-block__item-value">
										{{ transaction.comment ?? 'Отсутствует..' }}
									</div>
								</div>
							</div>

						</div>

						<hr>

						<div class="input-group input-group-round">
							<div class="input-group-prepend">
								<span class="input-group-text">
									<i class="material-icons">live_help</i>
								</span>
							</div>
							<input type="text" class="form-control" placeholder="Комментарий к статусу.." aria-label="Комментарий к статусу.." v-model="comment">
						</div>

						<div class="status-actions mt-3">
							<span v-for="status in statuses" :key="status.value" class="badge badge-secondary setstatus mx-1" :class="status.value" @click="setStatus(status.value)">{{ status.name }}</span>
						</div>

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
			transaction: [],
			comment: '',

			formatDate,

			statuses: [
				{
					name: 'Ожидание оплаты',
					value: 'pending'
				},
				{
					name: 'В обработке',
					value: 'processing'
				},
				{
					name: 'Неоплачено',
					value: 'unpaid'
				},
				{
					name: 'Заблокировано',
					value: 'failed'
				},
				{
					name: 'Обработано',
					value: 'paid'
				},
			],
		}
	},
	async fetch() {
		await this.fetchTransaction()
	},
	methods: {

		async fetchTransaction() {
			const response = (await this.$axios.get(`/admin/transactions/${this.$route.params.id}`)).data
			this.transaction = response.data
		},

		async setStatus(status) {
			const response = (await this.$axios.post(`/admin/transactions/${this.$route.params.id}/set-status`, {
				status,
				comment: this.comment
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.transaction.status = status
				this.transaction.comment = this.comment ? this.comment : this.transaction.comment
			} else {
				this.$toast.error(response.message)
			}
		}
	}

}

</script>