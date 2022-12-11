<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Редактирование "Bitcoin"</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block">

						<div class="row">

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Название</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="Bitcoin">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Атрибут</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="BTC">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Резерв</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="1,0213213">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Курс</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="17023">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Процент комиссии</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="1">
									</div>
								</div>
							</div>

						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-dark">Сохранить</button>
						</div>


						<hr>

						<div class="transaction-info-block__item">
							<div class="transaction-info-block__item-title">Статус</div>
							<div class="transaction-info-block__item-value fw-bold text-success">Активный</div>
							<button type="button" class="btn btn-danger btn-sm my-2">Отключить</button>
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