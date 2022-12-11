<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Добавление новой страницы</h1>
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
										<input type="text" class="form-control" value="Пользовательское соглашение">
									</div>
								</div>

								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Ссылка</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" value="/aggreement">
									</div>
								</div>

								<div class="transaction-info-block__item mt-3">
									<button type="submit" class="btn btn-dark btn-block">Сохранить</button>
								</div>
							</div>

							<div class="col-md-8">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Содержимое страницы</div>
									<div class="transaction-info-block__item-value">
										<textarea class="form-control" placeholder="Начните вводить.." rows="15"></textarea>
									</div>
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

export default {
	layout: "admin"
}

</script>