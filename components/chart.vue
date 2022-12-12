<template>
	<div class="card mt-1" v-if="currentCoin">
		<div class="card-body p-3">

			<div class="pair-switcher">{{ currentCoin }}</div>

			<div class="trading_terminal" id="trading_terminal"></div>

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
			currentCoin: 'BTCUSDT'
		}
	},
	created() {
		this.$nuxt.$off('changeCoin')
		this.$nuxt.$on('changeCoin', (coin) => {
			this.currentCoin = coin.toUpperCase() + 'USDT'
			this.getChart()
		})
	},
	mounted() {

	},
	async fetch() {
		await this.getChart()
	},
	methods: {

		async getChart() {
			const res = await fetch('https://api.binance.com/api/v3/klines?symbol=' + this.currentCoin + '&interval=1d&limit=10000');
			const data = await res.json();

			for(let i = 0; i < data.length; i++) {
				let item = {};
				item.time = data[i][0] / 1000;
				item.open = data[i][1];
				item.high = data[i][2];
				item.low = data[i][3];
				item.close = data[i][4];
				this.atrs.push(item);
			}
			this.updateChart();
		},

		updateChart() {
			document.querySelector('#trading_terminal').innerHTML = ''
			const chart = createChart(document.querySelector('#trading_terminal'), { 
				height: 384, 
			    timeScale: {
					borderColor: "rgba(197, 203, 206, 0.8)",
					timeVisible: true,
					secondsVisible: false,
				},
			});

			
			const lineSeries = chart.addCandlestickSeries({
				upColor: "#089981",
				downColor: "#f23645",
				borderDownColor: "#f23645",
				borderUpColor: "#089981",
				wickDownColor: "#f23645",
				wickUpColor: "#089981",
			});

			lineSeries.setData(this.atrs);


			//lineSeries.setData(this.atrs);
		}
	}
}
</script>
