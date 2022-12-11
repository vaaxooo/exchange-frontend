<template>
	<div class="exchange-block mt-1">
		<div class="exchange-block-header mb-2">
			<ul class="nav nav-tabs">
				<li class="nav-item px-0 mx-0">
					<a class="nav-link exchange-switcher active" href="#">Купить</a>
				</li>
				<li class="nav-item">
					<a class="nav-link exchange-switcher" href="#">Продать</a>
				</li>
			</ul>
		</div>

		<div class="exchange-block-body">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы отдаёте</label>
						<input type="text" class="form-control" placeholder="Сумма" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<input type="text" class="form-control disabled" disabled value="USDT">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>Вы получаете</label>
						<input type="text" class="form-control" placeholder="Сумма" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group mx-auto m-auto vertical-with-input">
						<select class="form-control">
							<option>BTC</option>
							<option>BNB</option>
							<option>TRX</option>
							<option>ETH</option>
						</select>
					</div>
				</div>
			</div>

			<hr>

			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<div class="exchange-info">
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Курс</div>
								<div class="exchange-info-item-value">17,103</div>
							</div>
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Комиссия</div>
								<div class="exchange-info-item-value">0,0002412</div>
							</div>
							<div class="exchange-info-item">
								<div class="exchange-info-item-title">Ваш баланс</div>
								<div class="exchange-info-item-value transaction-info-block__item-value">
									<img src="/icons/usdt.png" class="transaction-info-block__item-value-icon"> 7,000.00
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<button type="button" class="btn btn-dark btn-block">Купить</button>
				</div>
			</div>

		</div>


	</div>
</template>