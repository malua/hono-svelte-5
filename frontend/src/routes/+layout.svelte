<script lang="ts">
	import '@/app.css';
	import { Toaster } from '@/lib/components/ui/sonner';
	let { children } = $props();
</script>

<main class="w-full h-screen overflow-hidden">
	{@render children()}
</main>
<Toaster richColors />
