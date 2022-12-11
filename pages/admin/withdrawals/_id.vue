<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Пополнение / вывод средств</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block">

						<div class="row">
							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер</div>
									<div class="transaction-info-block__item-value">#1</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Hash</div>
									<div class="transaction-info-block__item-value">sadqp1jwondlkqndlknsd</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Тип</div>
									<div class="transaction-info-block__item-value fw-bold text-success">
										Пополнение
									</div>
								</div>
							</div>



							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Пользователь</div>
									<div class="transaction-info-block__item-value">
										<a href="#" class="transaction-info-block__item-value-link">test@example.com</a>
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Кошелёк получателя</div>
									<div class="transaction-info-block__item-value">
										Отсутствует
									</div>
								</div>
							</div>


							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата создания</div>
									<div class="transaction-info-block__item-value">
										2022-01-01 00:00:00
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Сумма</div>
									<div class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 570.00
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Статус</div>
									<div class="transaction-info-block__item-value">
										<span class="badge bg-success">Успешно</span>
									</div>
								</div>
							</div>

							<div class="col-md-8 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Комментарий к статусу</div>
									<div class="transaction-info-block__item-value">
										Отсутствует..
									</div>
								</div>
							</div>

						</div>

						<hr>


						<div class="row">
							<div class="col-md-6">
								<div class="input-group input-group-round">
									<div class="input-group-prepend">
										<span class="input-group-text">
											<i class="material-icons">live_help</i>
										</span>
									</div>
									<input type="text" class="form-control" placeholder="Кошелёк пользователя" aria-label="Кошелёк пользователя">
								</div>
							</div>
							<div class="col-md-6">
								<div class="input-group input-group-round">
									<div class="input-group-prepend">
										<span class="input-group-text">
											<i class="material-icons">live_help</i>
										</span>
									</div>
									<input type="text" class="form-control" placeholder="Комментарий к статусу.." aria-label="Комментарий к статусу..">
								</div>
							</div>
						</div>

						<div class="status-actions mt-3">
							<span class="badge badge-secondary setstatus pending">Ожидание оплаты</span>
							<span class="badge badge-secondary setstatus processing">В обработке</span>
							<span class="badge badge-secondary setstatus unpaid">Неоплачено</span>
							<span class="badge badge-secondary setstatus failed">Заблокировано</span>
							<span class="badge badge-secondary setstatus paid">Обработано</span>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>
<script>

export default {
	layout: "admin"
}

</script>