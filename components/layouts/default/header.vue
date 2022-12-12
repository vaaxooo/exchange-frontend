<template>
	<div>
		<header class="p-3 text-bg-white">
			<div class="container">
				<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

					<a class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" href="/">
						<img alt="Pipeline" src="/img/logo.svg">
					</a>

					<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ">
						<li><a href="/" class="nav-link px-2 text-dark">Главная</a></li>
						<li><a href="#" class="nav-link px-2 text-dark">О нас</a></li>

						<li v-for="contact in contacts" :key="contact.id">
							<a :href="contact.link" class="nav-link px-2 text-dark">{{ contact.name }}</a>
						</li>
					</ul>

					<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

					</form>

					<div class="text-end" v-if="!$auth.user">
						<a href="/auth/login" class="btn btn-outline-dark me-2">Вход</a>
						<a href="/auth/register" class="btn btn-dark">Регистрация</a>
					</div>

					<div class="text-end" v-if="$auth.user">
						<button class="btn btn-outline-dark me-2" @click="logout">Выйти</button>
					</div>
				</div>
			</div>
		</header>

		<div class="menu">
			<ul class="nav nav-tabs container">
				<li class="nav-item">
					<a class="nav-link active" href="/">Маркет</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/pay">Пополнение баланса</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/withdrawal">Вывод средств</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/settings">Настройки</a>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			contacts: []
		}
	},
	async fetch() {
		await this.fetchContacts()
	},
	methods: {
		async fetchContacts() {
			const response = (await this.$axios.get('/get-contacts')).data
			this.contacts = response.data
		},

		logout() {
			this.$auth.logout()
		}
	},
}
</script>