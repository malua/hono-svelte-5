<script lang="ts">
	import '@/app.css';
	import { Toaster } from '@/lib/components/ui/sonner';
	const { children } = $props();
</script>

<main class="h-screen w-full overflow-hidden">
	{@render children()}
</main>
<Toaster richColors />
