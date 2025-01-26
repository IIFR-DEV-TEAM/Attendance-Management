<script lang="ts">
	import '../app.css';
	import { preventDevTools } from '$lib/dev-tools-prevention';
	preventDevTools()
	let { children } = $props();
</script>

<svelte:head>
   <title>Bigyan-Labs: AMS</title>
</svelte:head>

{@render children()}
