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
						<input type="number" class="form-control" placeholder="Сумма" v-model="buy.amount" />
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
						<input type="number" class="form-control" placeholder="Сумма" v-model="buy.price" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled value="btc">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label>Биржа</label>
						<select class="form-control" v-model="buy.exchange" @change="changeBuyExchange">
							<option v-for="(exchange, index) in rates" :key="index" :value="index">{{ index[0].toUpperCase() + index.slice(1) }} - {{ exchange }}</option>
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
								<div class="exchange-info-item-value">{{ rate }}</div>
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
						<input type="number" class="form-control" placeholder="Сумма" v-model="sell.price" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled value="btc">
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы получаете</label>
						<input type="number" class="form-control" placeholder="Сумма" v-model="sell.amount" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled v-model="sell.currency">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label>Биржа</label>
						<select class="form-control" v-model="sell.exchange" @change="changeSellExchange()">
							<option v-for="(exchange, index) in rates" :key="index" :value="index">{{ index[0].toUpperCase() + index.slice(1) }} - {{ exchange }}</option>
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
								<div class="exchange-info-item-value">{{ rate }}</div>
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
			rate: 0,

			buy: {
				amount: 0,
				currency: 'usdt',
				coin: 'btc',
				price: 0,
				total: 0,
				commission: 0,
				exchange: 'binance'
			},

			sell: {
				amount: 0,
				currency: 'usdt',
				coin: 'btc',
				price: 0,
				total: 0,
				commission: 0,
				exchange: 'binance'
			},

			rates: {
				binance: 0,
				kraken: 0,
				cex: 0
			},

			coins: []
		}
	},
	watch: {
		'buy.exchange'() {
			this.rate = this.rates[this.buy.exchange]
			this.calculate()
		},

		'sell.exchange'() {
			this.rate = this.rates[this.sell.exchange]
			this.calculate()
		},

		// 'buy.price'() {
		// 	if(this.buy.price !== '') {
		// 		this.buy.amount = +this.buy.price * +this.rate
		// 		this.calculate()
		// 	} else {
		// 		this.buy.amount = 0
		// 	}
		// },

		'buy.amount'() {
			if(this.buy.amount !== '') {
				this.buy.price = (+this.buy.amount / +this.rate)
				this.calculate()
			} else {
				this.buy.price = 0
			}
		},

		'sell.price'() {
			if(this.sell.price !== '') {
				this.sell.amount = +this.sell.price * +this.rate
				this.calculate()
			} else {
				this.sell.amount = 0
			}
		},

		// 'sell.amount'() {
		// 	if(this.sell.price !== '') {
		// 		this.sell.price = (+this.sell.amount / +this.rate)
		// 		this.calculate()
		// 	} else {
		// 		this.sell.price = 0
		// 	}
		// }
	},
	async fetch() {
		await this.fetchCoins()
		await this.getRates()
	},
	methods: {
		changeBuyExchange() {
			this.rate = this.rates[this.buy.exchange]
		},

		changeSellExchange() {
			this.rate = this.rates[this.sell.exchange]
		},

		async getRates() {
			const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=1');
			const data = await res.json();

			if(data[0][4] == undefined) {
				this.rates.binance = 0
			} else {
				this.rates.binance = (+data[0][4]).toFixed(2)
			}

			/* ######################### */

			const res2 = await fetch('https://api.kraken.com/0/public/Ticker?pair=BTCUSDT');
			const data2 = await res2.json();

			let result = Object.values(data2.result)

			if(result == undefined) {
				this.rates.kraken = 0
			} else {
				this.rates.kraken = +(+result[0].c[0]).toFixed(2)
			}

			/* ######################### */

			const res3 = await fetch('https://cex.io/api/last_price/BTC/USDT');
			const data3 = await res3.json();

			if(data3.lprice == undefined) {
				this.rates.cex = 0
			} else {
				this.rates.cex = +(+data3.lprice).toFixed(2)
			}
			this.rate = this.rates[this.buy.exchange]


			/* ######################### */

		},

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
			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.buy.currency,
				coinTo: this.buy.coin,
				amountFrom: +this.buy.amount,
				type: 'buy',
				exchange: this.buy.exchange,
				rate: this.rate
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				this.$router.go('/arbitrage')
			} else {
				this.$toast.error(response.message)
			}
		},

		async exchangeSell() {
			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.sell.coin,
				coinTo: this.sell.currency,
				amountFrom: +this.sell.price,
				type: 'sell',
				exchange: this.sell.exchange,
				rate: this.rate
			})).data
			if(response.code === 200) {
				this.$toast.success(response.message)
				let newBalance = this.wallets.filter(wallet => wallet.coin.symbol === this.sell.coin)[0].balance - this.sell.price
				this.wallets.filter(wallet => wallet.coin.symbol === this.sell.coin)[0].balance = newBalance
				this.$auth.setUser({
					...this.$auth.user,
					wallets: this.wallets
				})
				this.$router.go('/arbitrage')
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