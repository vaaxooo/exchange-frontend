<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Динамические страницы</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="form-group mb-4">
						<a href="/admin/pages/create" class="btn btn-success">
							<span class="material-symbols-outlined">add</span> Добавить
						</a>
					</div>

					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Название страницы</th>
									<th scope="col">Ссылка</th>
									<th scope="col">Статус</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>Пользовательское соглашение</td>
									<td>
										/aggreement
									</td>
									<td class="text-success fw-bold">Активный</td>
									<td>
										<a href="/admin/pages/3" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon">
											<span class="material-icons">delete</span>
										</a>
									</td>
								</tr>
								<tr>
									<th scope="row">1</th>
									<td>Тестовая страница</td>
									<td>
										/test-page
									</td>
									<td class="text-success fw-bold">Активный</td>
									<td>
										<a href="/admin/pages/3" class="btn btn-light btn-sm btn-icon">
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