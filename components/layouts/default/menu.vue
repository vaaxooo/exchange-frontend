<template>
	<div class="navbar navbar-expand-lg bg-white navbar-white sticky-top">

		<a class="navbar-brand" href="#">
			<img alt="Pipeline" src="/logo.jpg" width="62px">
		</a>
		<div class="d-flex align-items-center">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation" @click="menu">
		<span class="navbar-toggler-icon"></span>
		</button>

		</div>
		<div class="collapse navbar-collapse flex-column" id="navbar-collapse" :class="{'d-block': isOpenMenu}">
			<ul class="navbar-nav d-lg-block">

				<!-- <li class="nav-item">
					<a class="nav-link" href="/">
						<span class="material-symbols-outlined">home</span> Главная
					</a>
				</li> -->

				<li class="nav-item" v-if="!$auth.user">
					<a class="nav-link" href="/auth/login">
						<span class="material-symbols-outlined">login</span> Вход
					</a>
				</li>

				<li class="nav-item" v-if="!$auth.user">
					<a class="nav-link" href="/auth/register">
						<span class="material-symbols-outlined">login</span> Регистрация
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/" v-if="$auth.user">
						<span class="material-symbols-outlined">person</span> Личный кабинет
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/market" v-if="$auth.user">
						<span class="material-symbols-outlined">currency_exchange</span> Маркет
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/arbitrage" v-if="$auth.user">
						<span class="material-symbols-outlined">currency_exchange</span> Торговля
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/pay" v-if="$auth.user">
						<span class="material-symbols-outlined">wallet</span> Пополнение баланса
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/withdrawal" v-if="$auth.user">
						<span class="material-symbols-outlined">wallet</span> Вывод средств
					</a>
				</li>


				<li class="nav-item">
					<a class="nav-link" href="#" @click="logout" v-if="$auth.user">
						<span class="material-symbols-outlined">logout</span> Выйти из аккаунта
					</a>
				</li>

			</ul>
			<hr>
			<div class="d-none d-lg-block w-100">
				<span class="text-small text-muted">Быстрые ссылки</span>
				<ul class="nav nav-small flex-column mt-2" v-if="Object.keys(contacts).length > 0">
					<li v-for="contact in contacts" :key="contact.id" class="nav-item">
						<a :href="contact.link" class="nav-link">{{ contact.name }}</a>
					</li>
				</ul>

				<ul class="nav nav-small flex-column mt-2" v-if="Object.keys(links).length > 0">
					<li v-for="link in links" :key="link.id" class="nav-item">
						<a :href="'/' + link.slug" class="nav-link">{{ link.title ?? 'Не указано' }}</a>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			contacts: [],
			links: [],

			isOpenMenu: false
		}
	},
	async fetch() {
		await this.fetchContacts()
		await this.fetchPages()
	},
	methods: {
		async fetchContacts() {
			const response = (await this.$axios.get('/get-contacts')).data
			this.contacts = response.data
		},

		async fetchPages() {
			const response = (await this.$axios.get('/pages')).data
			this.links = response.data.data
		},

		menu() {
			this.isOpenMenu = !this.isOpenMenu
		},

		logout() {
			location.href = '/auth/login'
			this.$auth.logout()
		}
	}
}
</script>