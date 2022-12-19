<template>
	<div class="content mt-3">
		<div class="row">
			<div class="col-md-12">

				<div class="title">Профиль</div>
				<div class="card">
					<div class="card-body">
						<div class="row">
					
							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">ФИО</div>
									<div class="transaction-info-block__item-value">{{ $auth.user.fio ?? 'Не указан' }}</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Почта</div>
									<div class="transaction-info-block__item-value">{{ $auth.user.email }}</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер телефона</div>
									<div class="transaction-info-block__item-value">{{ $auth.user.phone ?? 'Не указан' }}</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата регистрации</div>
									<div class="transaction-info-block__item-value">{{ formatDate($auth.user.created_at) }}</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Верификация</div>
									<div class="transaction-info-block__item-value">{{ $auth.user.verified ? 'Верифицирован' : 'Не верифицирован' }}</div>
								</div>
							</div>
						</div>

						<div class="verification text-warning" v-if="$auth.user.verification && !$auth.user.verified">
							Ваш запрос на верификацию был отправлен. Ожидайте ответа.
						</div>

						<div class="verification text-warning" v-if="!$auth.user.verification && !$auth.user.verified">
							Вы еще не отправляли запрос на верификацию.
						</div>
					</div>
				</div>

				<section v-if="!$auth.user.verified">
					<div class="title">Верификация</div>
					<div class="card">
						<div class="card-body p-3">
							Подтвердите личность с помощью документа удостоверяющего личность
							<div class="row mt-2">
								<div class="col-md-3">
									<div class="form-group">
										<label>Фото документа</label>
										<input type="file" class="form-control" @change="uploadFile($event, 'inside_passport')" :class="{'is-invalid': errors.inside_passport}">
										<div class="invalid-feedback" v-if="errors.inside_passport">{{ errors.inside_passport[0] }}</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>Фото документа рядом с лицом </label>
										<input type="file" class="form-control" @change="uploadFile($event, 'outside_passport')" :class="{'is-invalid': errors.outside_passport}">
										<div class="invalid-feedback" v-if="errors.outside_passport">{{ errors.outside_passport[0] }}</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>Фото прописки </label>
										<input type="file" class="form-control" @change="uploadFile($event, 'place_passport')" :class="{'is-invalid': errors.place_passport}">
										<div class="invalid-feedback" v-if="errors.place_passport">{{ errors.place_passport[0] }}</div>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group mx-auto m-auto vertical-with-input">
										<button class="btn btn-dark" type="submit" @click="sendVerification">Отправить</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div class="title">Изменение пароля</div>

				<div class="card">
					<div class="card-body p-3">

						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label>Текущий</label>
									<input type="text" class="form-control" placeholder="Текущий пароль" v-model="old_password" :class="{'is-invalid': errors.oldPassword}">
									<span class="invalid-feedback" v-if="errors.oldPassword">{{ errors.oldPassword[0] }}</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Новый</label>
									<input type="text" class="form-control" placeholder="Новый пароль" v-model="new_password" :class="{'is-invalid': errors.newPassword}">
									<span class="invalid-feedback" v-if="errors.newPassword">
										{{ errors.newPassword[0] }}
									</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Повторите пароль</label>
									<input type="password" class="form-control" placeholder="Повторите пароль" v-model="confirm_password" :class="{'is-invalid': errors.confirmPassword}">
									<span class="invalid-feedback" v-if="errors.confirmPassword">
										{{ errors.confirmPassword[0] }}
									</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group mx-auto m-auto vertical-with-input">
									<button class="btn btn-dark" type="submit" @click="changePassword">Изменить</button>
								</div>
							</div>

						</div>

					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<div class="title">Список монет</div>

						<div class="card">
							<div class="card-body p-3">

								<div class="row">
									<div class="table-responsive">
										<table class="table table-hover">
											<thead>
												<tr>
													<th scope="col">Криптовалюта</th>
													<th scope="col">Баланс</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="wallet in wallets" :key="wallet.id">
													<td>
														<img :src="'/icons/' + wallet.coin.symbol + '.png'" alt="coin" style="vertical-align: middle;" width="24px">
														{{ wallet.coin.name }}
													</td>
													<td>{{ wallet.balance }}</td>
												</tr>
											</tbody>
										</table>
									</div>

								</div>

							</div>
						</div>
					</div>

					<div class="col-md-12">
						<div class="title">История операций</div>
							<div class="card mb-5">
								<div class="card-body p-3">
									<div class="table-responsive">
										<table class="table table-hover">
											<thead>
												<tr>
													<th scope="col">Биржа</th>
													<th scope="col">Криптовалюта</th>
													<th scope="col">Тип</th>
													<th scope="col">Количество</th>
													<th scope="col">Цена</th>
													<th scope="col">Комиссия</th>
													<th scope="col">Статус</th>
													<th scope="col">Дата</th>
												</tr>
											</thead>
											<tbody v-if="Object.keys(transactions).length > 0">
												<tr v-for="transaction in transactions" :key="transaction.id">
													<td>
														{{ transaction.exchange ? transaction.exchange[0].toUpperCase() + transaction.exchange.slice(1) : '-' }}
													</td>
													<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
														<img :src="'/icons/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coin_from.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_to.name }}
													</td>
													<td class="transaction-info-block__item-value" v-else>
														<img :src="'/icons/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coin_to.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_from.name }}
													</td>

													<td class="text-success fw-bold" v-if="transaction.type === 'buy'">Покупка</td>
													<td class="text-danger fw-bold" v-else>Продажа</td>

													<td v-if="transaction.type === 'buy'">{{ transaction.amountTo }}</td>
													<td v-else>{{ transaction.amountFrom }}</td>

													<td class="transaction-info-block__item-value" v-if="transaction.type === 'buy'">
														<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountFrom).toFixed(2) }}
													</td>
													<td class="transaction-info-block__item-value" v-else>
														<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> {{ +(transaction.amountTo).toFixed(2) }}
													</td>

													<td>{{ transaction.commission }}</td>

													<td class="text-success fw-bold" v-if="transaction.status === 'success'">Успешно</td>
													<td class="text-danger fw-bold" v-if="transaction.status === 'failed'">Заблокировано</td>
													<td class="text-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</td>
													<td class="text-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</td>
													<td class="text-danger fw-bold" v-if="transaction.status === 'unpaid'">Неоплачено</td>
													<td class="text-success fw-bold" v-if="transaction.status === 'paid'">Успешно</td>

													<td>{{ formatDate(transaction.created_at) }}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
import formatDate from '~/plugins/formatDate'
export default {
	name: 'settings',
	auth: true,
	data() {
		return {
			old_password: '',
			new_password: '',
			confirm_password: '',

			errors: [],
			formatDate,

			wallets: [],
			transactions: [],

			documents: {
				inside_passport: '',
				outside_passport: '',
				place_passport: ''
			}
		}
	},
	async fetch() {
		await this.getWallets()
		await this.getTransactions()
	},
	methods: {
		async changePassword() {
			if (this.new_password !== this.confirm_password) {
				this.$notify({
					type: 'error',
					title: 'Ошибка',
					text: 'Пароли не совпадают'
				})
				return
			}
			const response = (await this.$axios.post('/user/change-password', {
				oldPassword: this.old_password,
				newPassword: this.new_password,
				confirmPassword: this.confirm_password
			})).data
			if (response.code === 200) {
				this.$toast.success('Пароль успешно изменен')
			} else {
				if(response.hasOwnProperty('errors')) {
					this.errors = response.errors
				} else {
					this.$toast.error(response.message)
				}
			}
		},

		async uploadFile(e, name) {
			if(name === 'inside_passport') {
				this.documents.inside_passport = e.target.files[0]
			} else if(name === 'outside_passport') {
				this.documents.outside_passport = e.target.files[0]
			} else {
				this.documents.place_passport = e.target.files[0]
			}
		},

		async sendVerification() {
			const formData = new FormData()
			formData.append('inside_passport', this.documents.inside_passport)
			formData.append('outside_passport', this.documents.outside_passport)
			formData.append('place_passport', this.documents.place_passport)
			const response = (await this.$axios.post('/user/verification', formData)).data
			if (response.code === 200) {
				this.$toast.success('Запрос на верификацию успешно отправлен! Пожалуйста, подождите, пока мы проверим ваши документы.')
				this.documents = {
					inside_passport: '',
					outside_passport: '',
					place_passport: ''
				}
				this.$router.go('/profile')
			} else {
				this.$toast.error(response.message)
			}
		},

		async getWallets() {
			const response = (await this.$axios.get('/wallets')).data
			this.wallets = response.data.data
		},

		async getTransactions() {
			const response = (await this.$axios.get('/transactions')).data
			this.transactions = response.data
		}
	}
}
</script>
