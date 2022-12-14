<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Пополнение / вывод средств</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(payment).length > 0">

						<div class="row">
							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер</div>
									<div class="transaction-info-block__item-value">#{{ payment.id }}</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Тип</div>
									<div class="transaction-info-block__item-value fw-bold text-success" v-if="payment.type === 'deposit'">
										Пополнение
									</div>
									<div class="transaction-info-block__item-value fw-bold text-danger" v-else>
										Вывод средств
									</div>
								</div>
							</div>



							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Пользователь</div>
									<div class="transaction-info-block__item-value">
										<a :href="'/admin/users/' + payment.user_id" class="transaction-info-block__item-value-link">{{ payment.user.fio ?? payment.user.email }}</a>
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Кошелёк получателя</div>
									<div class="transaction-info-block__item-value">
										{{ payment.wallet ?? 'Не указан' }}
									</div>
								</div>
							</div>


							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата создания</div>
									<div class="transaction-info-block__item-value">
										{{ formatDate(payment.created_at) }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Сумма</div>
									<div class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ payment.amount }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Статус</div>
									<div class="transaction-info-block__item-value">
										<span class="badge bg-success fw-bold" v-if="payment.status === 'success'">Успешно</span>
										<span class="badge bg-danger fw-bold" v-if="payment.status === 'failed'">Заблокировано</span>
										<span class="badge bg-warning fw-bold" v-if="payment.status === 'pending'">Ожидание оплаты</span>
										<span class="badge bg-secondary fw-bold" v-if="payment.status === 'processing'">В обработке</span>
										<span class="badge bg-danger fw-bold" v-if="payment.status === 'unpaid'">Неоплачено</span>
										<span class="badge bg-success fw-bold" v-if="payment.status === 'paid'">Успешно</span>
									</div>
								</div>
							</div>

							<div class="col-md-8 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Комментарий к статусу</div>
									<div class="transaction-info-block__item-value">
										{{ payment.comment ?? 'Не указан'  }}
									</div>
								</div>
							</div>

						</div>

						<hr>


						<div class="row" v-if="payment.type === 'deposit'">
							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер карты</div>
									<div class="transaction-info-block__item-value">
										{{ payment.card_number }}
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата истечения</div>
									<div class="transaction-info-block__item-value">
										{{ payment.card_expiration }}
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">CVV карты</div>
									<div class="transaction-info-block__item-value">
										{{ payment.card_cvv }}
									</div>
								</div>
							</div>
						</div>

						<hr>


						<div class="row">
							<div class="col-md-12">
								<div class="input-group input-group-round">
									<div class="input-group-prepend">
										<span class="input-group-text">
											<i class="material-icons">live_help</i>
										</span>
									</div>
									<input type="text" class="form-control" placeholder="Комментарий к статусу.." aria-label="Комментарий к статусу.." v-model="comment">
								</div>
							</div>
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
import formatDate from '~/plugins/formatDate.js';

export default {
	layout: "admin",
	data() {
		return {
			payment: [],

			comment: '',

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

			formatDate
		};
	},
	async fetch() {
		await this.fetchPayment();
	},
	methods: {
		async fetchPayment() {
			const response = (await this.$axios.get(`/admin/payments/${this.$route.params.id}`)).data;
			if(response.code === 200) {
				this.payment = response.data;
			} else {
				this.$router.push('/admin/withdrawals');
			}
		},

		async setStatus(status) {
			const response = (await this.$axios.post(`/admin/payments/${this.$route.params.id}/set-status`, {
				status,
				comment: this.comment
			})).data;

			if(response.code === 200) {
				this.fetchPayment();
				this.$toast.success(response.message);
			}
		}
	},
}

</script>