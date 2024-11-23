<script>
	const { children } = $props();
</script>

<div
	class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white max-w-lg px-6"
>
	{@render children()}
</div>
<div class="relative h-full w-full bg-neutral-900">
	<div class="absolute inset-0 bg-teal-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
</div>
