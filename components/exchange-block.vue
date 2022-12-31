<template>
	<div class="exchange-block mt-1">
		<div class="exchange-block-header mb-2">
			<ul class="nav nav-tabs">
				<li class="nav-item px-0 mx-0">
					<a class="nav-link exchange-switcher" :class="{'active': exchange_type === 'buy'}" href="#" @click="exchange_type = 'buy'">Купить</a>
				</li>
				<li class="nav-item">
					<a class="nav-link exchange-switcher" :class="{'active': exchange_type === 'sell'}" href="#" @click="exchange_type = 'sell'">Продать</a>
				</li>
			</ul>
		</div>

		<!-- EXCHANGE BLOCK BUY -->

		<div class="exchange-block-body" v-if="exchange_type === 'buy'">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы отдаёте</label>
						<input type="number" class="form-control" placeholder="Сумма" v-model="buy.amount" id="buy_amount" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled v-model="buy.currency">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы получаете</label>
						<input type="number" class="form-control" placeholder="Сумма" v-model="buy.price" id="buy_price" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<select class="form-control" v-model="buy.coin">
							<option v-for="coin in coins" :key="coin.id" :value="coin.symbol">{{ coin.name }}</option>
						</select>
					</div>
				</div>
			</div>

			<hr>

			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<div class="exchange-info">
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Курс</div>
								<div class="exchange-info-item-value">{{ exchange_rate }} $</div>
							</div>
							<div class="exchange-info-item">

							</div>
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Ваш баланс</div>
								<div class="exchange-info-item-value transaction-info-block__item-value">
									<img src="/icons/usdt.png" class="transaction-info-block__item-value-icon"> {{ (+$auth.user.balance).toFixed(2) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<button type="button" class="btn btn-dark btn-block" @click="exchangeBuy" v-if="+buy.price !== 0 && +buy.amount !== 0">Купить</button>
					<button type="button" class="btn btn-dark btn-block" disabled v-else>Купить</button>
				</div>
			</div>

		</div>



		<!-- EXCHANGE BLOCK SELL -->

		<div class="exchange-block-body" v-else>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы отдаёте</label>
						<input type="number" class="form-control" placeholder="Сумма" v-model="sell.price" id="sell_price" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<select class="form-control" v-model="sell.coin">
							<option v-for="coin in coins" :key="coin.id" :value="coin.symbol">{{ coin.name }}</option>
						</select>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы получаете</label>
						<input type="number" class="form-control" placeholder="Сумма" v-model="sell.amount" id="sell_amount" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled v-model="sell.currency">
					</div>
				</div>
			</div>

			<hr>

			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<div class="exchange-info">
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Курс</div>
								<div class="exchange-info-item-value">{{ exchange_rate }} $</div>
							</div>
							<div class="exchange-info-item">
	
							</div>
							<div class="exchange-info-item" v-if="sell.coin">
								<div class="exchange-info-item-title">Ваш баланс</div>
								<div class="exchange-info-item-value transaction-info-block__item-value">
									<img :src="'/icons/' + sell.coin + '.png'" class="transaction-info-block__item-value-icon"> {{ Object.keys(wallets.filter(wallet => wallet.coin.symbol === sell.coin)).length > 0 ? wallets.filter(wallet => wallet.coin.symbol === sell.coin)[0].balance : 0.00 }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<button type="button" class="btn btn-dark btn-block" @click="exchangeSell" v-if="+sell.amount !== 0 && +sell.price !== 0">Продать</button>
					<button type="button" class="btn btn-dark btn-block" disabled v-else>Продать</button>
				</div>
			</div>

		</div>


	</div>
</template>

<script>
export default {
	name: 'exchange-block',
	props: {
		wallets: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			exchange_type: 'buy',
			buy: {
				amount: 0,
				currency: 'usdt',
				coin: '',
				price: 0,
				total: 0,
				commission: 0
			},

			sell: {
				amount: 0,
				currency: 'usdt',
				coin: '',
				price: 0,
				total: 0,
				commission: 0
			},

			coins: [],

			exchange_rate: 0
		}
	},
	watch: {
		'buy.coin'() {
			this.exchange_rate = this.coins.filter(coin => coin.symbol === this.buy.coin)[0].exchange_rate
			this.$nuxt.$emit('changeCoin', this.buy.coin)
		},
		'sell.coin'() {
			this.exchange_rate = this.coins.filter(coin => coin.symbol === this.sell.coin)[0].exchange_rate
			this.$nuxt.$emit('changeCoin', this.sell.coin)
		},

		// 'buy.price'() {
		// 	if(this.buy.price !== '') {
		// 		this.buy.amount = this.buy.price * this.exchange_rate
		// 		this.calculate()
		// 	} else {
		// 		this.buy.amount = 0
		// 	}
		// },

		'buy.amount'() {
			if(this.buy.amount !== '') {
				this.buy.price = (this.buy.amount / this.exchange_rate)
				this.calculate()
			} else {
				this.buy.price = 0
			}
		},

		'sell.price'() {
			if(this.sell.price !== '') {
				this.sell.amount = this.sell.price * this.exchange_rate
				this.calculate()
			} else {
				this.sell.amount = 0
			}
		},

		// 'sell.amount'() {
		// 	if(this.sell.price !== '') {
		// 		this.sell.price = (this.sell.amount / this.exchange_rate)
		// 		this.calculate()
		// 	} else {
		// 		this.sell.price = 0
		// 	}
		// }
	},
	async fetch() {
		await this.fetchCoins()
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get('/coins')).data
			this.coins = response.data
			this.coins = this.coins.filter(coin => coin.symbol !== 'usdt')
			this.buy.coin = this.coins[0].symbol
			this.sell.coin = this.coins[0].symbol
		},

		exchange(type) {
			this.exchange_type = type
		},

		async exchangeBuy() {
			if(this.buy.amount <= 10) {
				this.$toast.error('Сумма должна быть больше 10 USDT')
				return
			}

			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.buy.currency,
				coinTo: this.buy.coin,
				amountFrom: +this.buy.amount,
				type: 'buy'
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.$router.go('/market')
			} else {
				this.$toast.error(response.message)
			}
		},

		async exchangeSell() {
			if(this.sell.price <= 10) {
				this.$toast.error('Сумма должна быть больше 10 USDT')
				return
			}

			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.sell.coin,
				coinTo: this.sell.currency,
				amountFrom: +this.sell.price,
				type: 'sell'
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				let newBalance = this.wallets.filter(wallet => wallet.coin.symbol === this.sell.coin)[0].balance - this.sell.price
				this.wallets.filter(wallet => wallet.coin.symbol === this.sell.coin)[0].balance = newBalance
				this.$auth.setUser({
					...this.$auth.user,
					wallets: this.wallets
				})
				this.$router.go('/market')
			} else {
				this.$toast.error(response.message)
			}
		},


		calculate() {
			if (this.exchange_type === 'buy') {
				this.buy.commission = +(+this.buy.price * +this.coins.filter(coin => coin.symbol === this.buy.coin)[0].fee / 100).toFixed(2)
				//this.buy.price = +this.buy.price - +this.buy.commission
			} else {
				this.sell.commission = +(+this.sell.price * +this.coins.filter(coin => coin.symbol === this.buy.coin)[0].fee / 100).toFixed(2)
				//this.price = +this.sell.price - +this.sell.commission
			}
		}
	}
}
</script>