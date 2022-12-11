<template>
	<div class="content mt-3">
		<div class="row">

			<div class="col-md-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Пополнение баланса</h5>
						<p class="card-text">Пополнение баланса происходит через Криптовалюту</p>
						<div class="form-group">
							<label>Сумма</label>
							<div class="input-group">

								<input type="text" class="form-control form-control-lg" placeholder="Сумма">
								<div class="input-group-append">
									<span class="input-group-text">USDT</span>
								</div>
							</div>
						</div>

						<div class="form-group">
							<a href="#" class="btn btn-dark">Пополнить</a>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-8">
				<div class="card">
					<div class="card-body">
						<div class="title mt-0">История пополнений</div>
						<div class="table-responsive">
							<table class="table table-hover">
								<thead>
									<tr>
										<th scope="col">ID</th>
										<th scope="col">Сумма</th>
										<th scope="col">Статус</th>
										<th scope="col">Дата</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">2</th>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
										</td>
										<td class="text-success fw-bold">Успешно</td>
										<td>12.12.2021 00:00:00</td>
									</tr>
									<tr>
										<th scope="row">3</th>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 150
										</td>
										<td class="text-success fw-bold">Успешно</td>
										<td>12.12.2021 00:00:00</td>
									</tr>
									<tr>
										<th scope="row">1</th>
										<td class="transaction-info-block__item-value">
											<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
										</td>
										<td class="text-danger fw-bold">Отменено</td>
										<td>12.12.2021 00:00:00</td>
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
	name: 'pay',
	auth: true
}
</script>