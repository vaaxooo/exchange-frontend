<template>
	<div class="footer">
		<ul class="links">
			<li v-for="link in links" :key="link.id">
				<a :href="'/' + link.slug">{{ link.title }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		links: {
			type: Array,
			default: () => []
		}
	}
}
</script>