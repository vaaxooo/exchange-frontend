<template>
	<div class="card mt-1" v-if="currentCoin">
		<div class="card-body p-3">

			<div class="pair-switcher">{{ currentCoin }}</div>

			<!-- <div class="trading_terminal" id="trading_terminal"></div> -->

			<ul class="trande-sites">
				<li class="site">
					<a href="https://www.binance.com/en/trade/BTC_USDT" target="_blank">
						<img src="https://bin.bnbstatic.com/static/images/common/favicon.ico" class="site-logo" alt="Binance">
						<div class="site-name">
							<span>Binance</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.binance }} $</span>
						</div>
					</a>
				</li>
				<li class="site">
					<a href="https://www.bitfinex.com/t/BTCUSD" target="_blank">
						<img src="https://www.bitfinex.com/assets/icons/icon-48x48.png?v=4ebc788ff3a9cca02746390287951be5" class="site-logo" alt="Bitfinex">
						<div class="site-name">
							<span>Bitfinex</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.bitfinex }} $</span>
						</div>
					</a>
				</li>
				<li class="site">
					<a href="https://www.bitstamp.net/market/tradeview/" target="_blank">
						<img src="https://assets.bitstamp.net/static/webapp/images/favicons/favicon-32x32.d923b7f314e9f6a118ba1253aa580fc25556d1bf.png" class="site-logo" alt="Bitstamp">
						<div class="site-name">
							<span>Bitstamp</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.bitstamp }} $</span>
						</div>
					</a>
				</li>
				<li class="site">
					<a href="https://www.bittrex.com/Market/Index?MarketName=BTC-USDT" target="_blank">
						<img src="https://www.bittrex.com/favicon.ico" class="site-logo" alt="Bittrex">
						<div class="site-name">
							<span>Bittrex</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.bittrex }} $</span>
						</div>
					</a>
				</li>
				<li class="site">
					<a href="https://www.coinbase.com/price/btc-to-usd" target="_blank">
						<img src="https://www.coinbase.com/favicon.ico" class="site-logo" alt="Coinbase">
						<div class="site-name">
							<span>Coinbase</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.coinbase }} $</span>
						</div>
					</a>
				</li>
			</ul>


		</div>
	</div>
</template>
<script>
import { createChart } from 'lightweight-charts';

export default {
	data() {
		return {
			chart: null,
			lineSeries: null,
			atrs: [],
			currentCoin: 'BTCUSDT',
			first_coin: 'BTC',
			second_coin: 'USDT',

			rates: {
				binance: 0,
				bitfinex: 0,
				bitstamp: 0,
				bittrex: 0,
				coinbase: 0,
			}
		}
	},
	created() {
		this.$nuxt.$off('changeCoin')
		this.$nuxt.$on('changeCoin', (coin) => {
			this.first_coin = coin.toUpperCase()
			this.currentCoin = coin.toUpperCase() + 'USDT'
			this.getRates()
		})
	},
	mounted() {

	},
	async fetch() {
		// await this.getChart()
		await this.getRates()
	},
	methods: {

		async getRates() {
			const res = await fetch('https://api.binance.com/api/v3/klines?symbol=' + this.currentCoin + '&interval=15m&limit=1');
			const data = await res.json();

			if(data[0][4] == undefined) {
				this.rates.binance = 0
			} else {
				this.rates.binance = (+data[0][4]).toFixed(2)
			}

			/* ######################### */

			const res2 = (await this.$axios.get('https://www.kucoin.com/_api/order-book/candles?symbol=' + this.first_coin + '-USDT&type=8hour&begin=1627200000&end=1641600000')).data

			if(res2.data[0][4] == undefined) {
				this.rates.bittrex = 0
			} else {
				this.rates.bittrex = (+res2.data[0][4]).toFixed(2)
			}

			/* ######################### */

			const res3 = await fetch('https://www.bitstamp.net/api/v2/ticker/' + this.currentCoin + '/');
			const data3 = await res3.json();

			if(data3['last'] == undefined) {
				this.rates.bitstamp = 0
			} else {
				this.rates.bitstamp = (+data3['last']).toFixed(2)
			}

			/* ######################### */

			const res5 = await fetch('https://api.coinbase.com/v2/prices/' + this.first_coin + '-USD/buy');
			const data5 = await res5.json();

			if(data5.data.amount == undefined) {
				this.rates.coinbase = 0
			} else {
				this.rates.coinbase = (+data5.data.amount).toFixed(2)
			}
		},

		// async getChart() {
		// 	const res = await fetch('https://api.binance.com/api/v3/klines?symbol=' + this.currentCoin + '&interval=1d&limit=10000');
		// 	const data = await res.json();

		// 	for(let i = 0; i < data.length; i++) {
		// 		let item = {};
		// 		item.time = data[i][0] / 1000;
		// 		item.open = data[i][1];
		// 		item.high = data[i][2];
		// 		item.low = data[i][3];
		// 		item.close = data[i][4];
		// 		this.atrs.push(item);
		// 	}
		// 	this.updateChart();
		// },

		// updateChart() {
		// 	document.querySelector('#trading_terminal').innerHTML = ''
		// 	const chart = createChart(document.querySelector('#trading_terminal'), { 
		// 		height: 384, 
		// 	    timeScale: {
		// 			borderColor: "rgba(197, 203, 206, 0.8)",
		// 			timeVisible: true,
		// 			secondsVisible: false,
		// 		},
		// 	});

			
		// 	const lineSeries = chart.addCandlestickSeries({
		// 		upColor: "#089981",
		// 		downColor: "#f23645",
		// 		borderDownColor: "#f23645",
		// 		borderUpColor: "#089981",
		// 		wickDownColor: "#f23645",
		// 		wickUpColor: "#089981",
		// 	});

		// 	lineSeries.setData(this.atrs);


		// 	//lineSeries.setData(this.atrs);
		// }
	}
}
</script>
