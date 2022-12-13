<template>
	<div class="navbar navbar-expand-lg bg-white navbar-white sticky-top">

		<a class="navbar-brand" href="#">
			<img alt="Pipeline" src="/logo.jpg" width="62px">
		</a>
		<div class="d-flex align-items-center">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
		</button>

		</div>
		<div class="collapse navbar-collapse flex-column" id="navbar-collapse">
			<ul class="navbar-nav d-lg-block">

				<li class="nav-item">
					<a class="nav-link" href="/admin/">
						<span class="material-symbols-outlined">home</span> Главная
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/transactions/">
						<span class="material-symbols-outlined">paid</span> Транзакции
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/users/">
						<span class="material-symbols-outlined">people</span> Пользователи
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/withdrawals/">
						<span class="material-symbols-outlined">paid</span> Пополнения и выплаты
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/coins/">
						<span class="material-symbols-outlined">monetization_on</span> Криптовалюта
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/pages/">
						<span class="material-symbols-outlined">description</span> Страницы
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/contacts/">
						<span class="material-symbols-outlined">description</span> Контакты
					</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="/admin/payments/">
						<span class="material-symbols-outlined">monetization_on</span> Платежи
					</a>
				</li>

			</ul>
			<hr>
			<div class="d-none d-lg-block w-100">
				<span class="text-small text-muted">Быстрые ссылки</span>
				<ul class="nav nav-small flex-column mt-2">
					<li class="nav-item">
						<a href="/" class="nav-link">Открыть сайт</a>
					</li>
				</ul>
				<ul class="nav nav-small flex-column mt-2">
					<li class="nav-item">
						<a href="#" class="nav-link" @click="logout">Выйти из аккаунта</a>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$auth.logout()
		}
	}
}
</script>