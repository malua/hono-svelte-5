<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import { cn } from '@/lib/utils/cn.js';

	let {
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</LabelPrimitive.Root>
