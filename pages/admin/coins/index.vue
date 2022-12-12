<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Криптовалюта</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="form-group mb-4">
						<a href="/admin/coins/create" class="btn btn-success">
							<span class="material-symbols-outlined">add</span> Добавить
						</a>
					</div>

					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Название</th>
									<th scope="col">Атрибут</th>
									<th scope="col">Резерв</th>
									<th scope="col">Статус</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="coin in coins" :key="coin.id">
									<th scope="row">{{ coin.id }}</th>
									<td class="transaction-info-block__item-value">
										<img :src="'/icons/' + (coin.symbol).toLowerCase() + '.png'" alt="btc" class="transaction-info-block__item-value-icon"> {{ coin.name }}
									</td>
									<td>{{ coin.symbol }}</td>
									<td>{{ coin.reserve }}</td>
									<td class="text-success fw-bold" v-if="coin.is_active">Активный</td>
									<td class="text-danger fw-bold" v-else>Не активный</td>
									<td>
										<a :href="'/admin/coins/' + coin.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon" @click="deleteCoin(coin.id)" v-if="coin.symbol !== 'usdt'">
											<span class="material-icons">delete</span>
										</a>
									</td>
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
	layout: "admin",
	auth: true,
	data() {
		return {
			coins: [],
		};
	},
	async fetch() {
		await this.fetchCoins();
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get("/admin/coins")).data;
			this.coins = response.data.data;
		},

		async deleteCoin(coin_id) {
			const response = (await this.$axios.delete("/admin/coins/" + coin_id)).data;
			if (response.code === 200) {
				this.$toast.success(response.message);
				this.coins = this.coins.filter(coin => coin.id !== coin_id);
			} else {
				this.$toast.error(response.message);
			}
		}
	},
}
</script>
