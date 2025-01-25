<script lang="ts">
	import '../app.css';
	import { preventDevTools } from '$lib/dev-tools-prevention';
	// preventDevTools()
	let { children } = $props();
</script>

{@render children()}
