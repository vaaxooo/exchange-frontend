<template>
    <div class="layout layout-nav-side">
		<layouts-default-menu />
        <div class="main-container mt-5">
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
	data() {
		return {
			links: []
		}
	},
	async fetch() {
		if(this.$auth.user && this.$auth.user.verification_code !== null && this.$route.name !== 'confirm') {
			this.$router.push('/auth/confirm')
		}

	    await this.fetchPages()
	},
	methods: {
		async fetchPages() {
			const response = (await this.$axios.get('/pages')).data
			this.links = response.data.data
		}
	}
}

</script>