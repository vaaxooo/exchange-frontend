<template>
	<div class="card mt-5">
		<div class="card-body">
			<h5 class="card-title">{{ page.title }}</h5>
			<p class="card-text">{{ page.content }}</p>
		</div>
	</div>
</template>
<script>
export default {
	layout: 'default',
	auth: false,
	data() {
		return {
			page: []
		}
	},
	async fetch() {
		await this.fetchPage()
	},
	methods: {
		async fetchPage() {
			const response = (await this.$axios.get('/pages/' + this.$route.params.page)).data
			if(response.code === 200) {
				if(Object.keys(response.data).length === 0) {
					this.$router.push('/')
				}
				this.page = response.data
			} else {
				this.$router.push('/')
			}
		}
	},

}
</script>