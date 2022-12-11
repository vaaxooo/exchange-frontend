<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Транзакции</h1>
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
									<th scope="col">Криптовалюта</th>
									<th scope="col">Количество</th>
									<th scope="col">Цена</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>test@example.com</td>
									<td class="text-success fw-bold">Покупка</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/btc.png" alt="btc" class="transaction-info-block__item-value-icon"> Bitcoin
									</td>
									<td>0.0001</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
									</td>
									<td class="text-success fw-bold">Выполнено</td>
									<td>2021-01-01 00:00:00</td>
									<td>
										<a href="/admin/transactions/3" class="btn btn-light btn-sm btn-icon">
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
									<td class="text-danger fw-bold">Продажа</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/eth.png" alt="eth" class="transaction-info-block__item-value-icon"> Ethereum
									</td>
									<td>0.0001</td>
									<td class="transaction-info-block__item-value">
										<img src="/icons/usdt.png" alt="usdt" class="transaction-info-block__item-value-icon"> 100
									</td>
									<td class="text-danger fw-bold">Заблокировано</td>
									<td>2021-01-01 00:00:00</td>
									<td>
										<a href="/admin/transactions/3" class="btn btn-light btn-sm btn-icon">
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