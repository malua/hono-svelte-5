<script lang="ts">
	import '@/app.css';
	import { Toaster } from '@/lib/components/ui/sonner';
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { authBasedRedirection } from './layout.svelte';

	const { children } = $props();
	$effect(() => {
		untrack(authBasedRedirection);
		[page.url.pathname];
	});
</script>

<main class="h-screen w-full overflow-hidden">
	{@render children()}
</main>
<Toaster richColors />
