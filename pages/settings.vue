<template>
	<div class="content mt-3">
		<div class="row">
			<div class="col-md-12">

				<div class="title">Изменение пароля</div>

				<div class="card mb-5">
					<div class="card-body p-3">

						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label>Текущий</label>
									<input type="text" class="form-control" placeholder="Текущий пароль">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Новый</label>
									<input type="text" class="form-control" placeholder="Новый пароль">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Повторите пароль</label>
									<input type="password" class="form-control" placeholder="Повторите пароль">
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group mx-auto m-auto vertical-with-input">
									<button class="btn btn-dark" type="submit">Сохранить</button>
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
	name: 'settings',
	auth: true,
}
</script>
