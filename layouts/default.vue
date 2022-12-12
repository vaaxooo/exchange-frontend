<template>

	<div>
		<layouts-default-header />
		<div class="container">
			
			<Nuxt />

			<layouts-default-footer :links="links" />
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