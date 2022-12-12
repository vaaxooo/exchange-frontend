<template>

	<div class="content mt-3">
		<div class="row">
			<div class="text-right p-2" v-if="Object.keys(wallets).length >= 6">
				<a href="#" class="text-link text-decoration-none text-muted">Посмотреть все</a>
			</div>

			<div class="coins-list row px-0 mx-0 mb-3" v-if="wallets">
				<my-coins v-for="wallet in wallets" :key="wallet.id" :wallet="wallet" />
			</div>


			<div class="col-md-4">
				<exchange-block :wallets="wallets" />
			</div>


			<div class="col-md-8">
				<chart />

				<div class="title">Последние операции</div>
				<div class="card mb-5">
					<div class="card-body p-3">
						<div class="table-responsive">
							<table class="table table-hover">
								<thead>
									<tr>
										<th scope="col">Криптовалюта</th>
										<th scope="col">Количество</th>
										<th scope="col">Цена</th>
										<th scope="col">Дата</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="transaction-info-block__item-value">
											<img src="/icons/btc.png" alt="btc" class="transaction-info-block__item-value-icon"> Bitcoin
										</td>
										<td>0.0001</td>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
										</td>
										<td>2022-12-08 00:00:00</td>
									</tr>
									<tr>
										<td class="transaction-info-block__item-value">
											<img src="/icons/eth.png" alt="eth" class="transaction-info-block__item-value-icon"> Ethereum
										</td>
										<td>1.0132</td>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
										</td>
										<td>2022-12-08 00:00:00</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>

</template>

<script>
export default {
  	name: 'IndexPage',
  	auth: true,
	data() {
		return {
			wallets: []
		}
	},
	async fetch() {
		await this.getWallets()
	},
	methods: {
		async getWallets() {
			const response = await this.$axios.$get('/wallets')
			this.wallets = response.data.data
		}
	}
}
</script>
