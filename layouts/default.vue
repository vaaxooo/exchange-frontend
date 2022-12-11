<template>

	<div>
		<layouts-default-header />
		<div class="container">
			
			<Nuxt />
		</div>

	</div>
</template>

<script>

export default {
	async fetch() {
		if(this.$auth.user && this.$auth.user.verification_code !== null && this.$route.name !== 'confirm') {
			this.$router.push('/auth/confirm')
		}
	},
}

</script>