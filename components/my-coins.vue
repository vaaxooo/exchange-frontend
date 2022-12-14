<template>
	<div class="col-md-2" v-if="wallet.coin.symbol !== 'usdt'">
		<div class="my-coin">
			<div class="coin-name">
				<img :src="'/icons/' + wallet.coin.symbol + '.png'" alt="coin" style="vertical-align: initial;">
				<div class="coin-desc">
					<span class="coin-title">{{ wallet.coin.name }}</span>
					<span class="coin-balance">{{ wallet.balance }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MyCoins',
	props: {
		wallet: {
			type: Object,
			required: true
		}
	}
}
</script>
