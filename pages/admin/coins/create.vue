<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Добавление новой монеты</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block">

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
							<button type="submit" class="btn btn-dark" @click="createCoin">Добавить</button>
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
	data() {
		return {
			coin: {
				name: "",
				attribute: "",
				reserve: "",
				fee: "",
				min_amount: "",
				max_amount: "",
				exchange_rate: ""
			},

			errors: []
		};
	},
	methods: {
		async createCoin() {
			const response = (await this.$axios.post('/admin/coins', this.coin)).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.$router.push('/admin/coins')
			} else {
				if(response.hasOwnProperty('errors')) {
					this.errors = response.errors
				} else {
					this.$toast.error(response.message)
				}
			}
		}
	}
}

</script>