<template>
    <div class="layout layout-nav-side">
		<layouts-admin-menu />
        <div class="main-container">
            <div class="container">
                <div class="row justify-content-center">
					<Nuxt />
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	auth: true,
	async fetch() {
		if(this.$auth.user.role !== 'admin') {
			this.$router.push('/')
		}
	}
}
</script>