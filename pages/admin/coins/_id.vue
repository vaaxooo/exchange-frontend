<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Редактирование "Bitcoin"</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(coin).length > 0">

						<div class="row">

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Название</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="Bitcoin" v-model="coin.name"  :class="{'is-invalid': errors.name}">
										<span class="invalid-feedback" v-if="errors.name">
											<strong>{{ errors.name[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Атрибут</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="BTC" v-model="coin.symbol"  :class="{'is-invalid': errors.symbol}">
										<span class="invalid-feedback" v-if="errors.symbol">
											<strong>{{ errors.symbol[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Резерв</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="1.35122" v-model="coin.reserve">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Курс</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="17242" v-model="coin.exchange_rate" :class="{'is-invalid': errors.exchange_rate}">
										<span class="invalid-feedback" v-if="errors.exchange_rate">
											<strong>{{ errors.exchange_rate[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Процент комиссии</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="0" v-model="coin.fee" :class="{'is-invalid': errors.fee}">
										<span class="invalid-feedback" v-if="errors.fee">
											<strong>{{ errors.fee[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Мин. сумма обмена</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="10" v-model="coin.min_amount" :class="{'is-invalid': errors.min_amount}">
										<span class="invalid-feedback" v-if="errors.min_amount">
											<strong>{{ errors.min_amount[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Макс. сумма обмена</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="15000" v-model="coin.max_amount" :class="{'is-invalid': errors.max_amount}">
										<span class="invalid-feedback" v-if="errors.max_amount">
											<strong>{{ errors.max_amount[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-dark" @click="update">Сохранить</button>
						</div>


						<hr>

						<div class="transaction-info-block__item">
							<div class="transaction-info-block__item-title">Статус</div>
							<div class="transaction-info-block__item-value fw-bold text-success" v-if="coin.is_active">Активный</div>
							<div class="transaction-info-block__item-value fw-bold text-danger" v-else>Неактивный</div>
							<button type="button" class="btn btn-danger btn-sm my-2" @click="active" v-if="coin.is_active">Отключить</button>
							<button type="button" class="btn btn-success btn-sm my-2" @click="active" v-else>Включить</button>
						</div>

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
			coin: [],

			errors: []
		}
	},
	async fetch() {
		await this.fetchCoin()
	},
	methods: {
		async fetchCoin() {
			const response = (await this.$axios.get(`/admin/coins/${this.$route.params.id}`)).data
			if(response.code === 200) {
				this.coin = response.data
			} else {
				this.$router.push('/admin/coins')
			}
		},

		async active() {
			const response = (await this.$axios.get(`/admin/coins/${this.$route.params.id}/active`)).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.coin.is_active = !this.coin.is_active
			}
		},

		async update() {
			const response = (await this.$axios.patch(`/admin/coins/${this.$route.params.id}`, this.coin)).data
			if(response.code === 200) {
				this.$toast.success(response.message)
			} else {
				this.errors = response.errors
			}
		}
	}
}

</script>