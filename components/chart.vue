<template>
	<div class="card mt-1" v-if="currentCoin">
		<div class="card-body p-3">

			<!-- <div class="trading_terminal" id="trading_terminal"></div> -->

			<ul class="trande-sites">
				<li class="site">
					<a>
						<div class="site-name">
							<span>Биржа</span>
						</div>
						<div class="site-rate">
							<span>Курс в долларах</span>
						</div>
					</a>
				</li>

				<li class="site">
					<a href="#">
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
					<a href="#">
						<img src="https://www.kraken.com/favicon.ico" class="site-logo" alt="Kraken">
						<div class="site-name">
							<span>Kraken</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.kraken }} $</span>
						</div>
					</a>
				</li>

				<li class="site">
					<a href="#">
						<img src="https://cex.io/img/favicon/favicon.ico" class="site-logo" alt="CEX">
						<div class="site-name">
							<span>CEX</span>
						</div>
						<div class="site-rate">
							<span>{{ rates.cex }} $</span>
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
				kraken: 0,
				cex: 0
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

			const res2 = await fetch('https://api.kraken.com/0/public/Ticker?pair=' + this.first_coin + 'USDT');
			const data2 = await res2.json();

			let result = Object.values(data2.result)

			if(result == undefined) {
				this.rates.kraken = 0
			} else {
				this.rates.kraken = +(+result[0].c[0]).toFixed(2)
			}

			/* ######################### */

			const res3 = await fetch('https://cex.io/api/last_price/' + this.first_coin + '/USDT');
			const data3 = await res3.json();

			if(data3.lprice == undefined) {
				this.rates.cex = 0
			} else {
				this.rates.cex = +(+data3.lprice).toFixed(2)
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
