<script lang="ts">
	import '@/app.css';
	import { Toaster } from '@/lib/components/ui/sonner';
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { authBasedRedirection } from './layout.svelte';
	import Cookies from 'js-cookie';
	import userStore from '@/lib/stores/user.svelte';
	import type { EnvUser } from '@backend/lib/types/app';

	const user = JSON.parse(decodeURI(Cookies.get('user-data') ?? 'null')) as EnvUser;
	userStore.setUser(user);

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
