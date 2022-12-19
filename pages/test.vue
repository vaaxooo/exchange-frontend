<template>

	<div class="content mt-3">
		<div class="row">

			<div class="card">
				<div class="card-body">
					<div class="title">Криптовалюты</div>
					<div class="table-resposible">
						<table class="table table-responsible">
							<thead>
								<tr>
									<th scope="col">Название</th>
									<th scope="col">Атрибут</th>
									<th scope="col">Курс</th>
								</tr>
							</thead>
							<tbody class="table-striped">
								<tr v-for="coin in coins" :key="coin.id">
									<td class="coin-border">
										<div class="coin-market">
											<img :src="coin.image" alt="coin" class="coin-market__img">
											{{ coin.name }}
										</div>
									</td>
									<td class="coin-border">{{ coin.symbol }}</td>
									<td class="coin-border">{{ coin.current_price }} $</td>
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

export default {
  	name: 'IndexPage',
  	auth: false,
	data() {
		return {
			coins: [],
		}
	},
	async fetch() {
		await this.getCoins()
	},
	methods: {
		async getCoins() {
			const response = (await this.$axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')).data
			this.coins = response
		},

	}
}
</script>
