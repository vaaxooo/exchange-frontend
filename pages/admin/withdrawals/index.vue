<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Пополнения и выплаты</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Пользователь</th>
									<th scope="col">Тип</th>
									<th scope="col">Сумма</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>test@example.com</td>
									<td class="text-success fw-bold">Пополнение</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
									</td>
									<td class="text-success fw-bold">Зачислено</td>
									<td>2021-01-01 00:00:00</td>
									<td>
										<a href="/admin/withdrawals/3" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon">
											<span class="material-icons">delete</span>
										</a>
									</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>test2@example.com</td>
									<td class="text-danger fw-bold">Вывод</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
									</td>
									<td class="text-danger fw-bold">Отказано</td>
									<td>2021-01-01 00:00:00</td>
									<td>
										<a href="/admin/withdrawals/3" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon">
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
	layout: "admin"
}

</script>