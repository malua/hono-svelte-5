<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';

	let { fallback, ...restProps }: AvatarPrimitive.RootProps & { fallback?: string } = $props();
</script>

<AvatarPrimitive.Root
	delayMs={200}
	class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-10 w-10 rounded-full text-[17px] font-medium uppercase data-[status=loading]:border-transparent"
>
	<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent">
		<AvatarPrimitive.Image {...restProps} />
		<AvatarPrimitive.Fallback class="border-muted border">{fallback ?? ''}</AvatarPrimitive.Fallback>
	</div>
</AvatarPrimitive.Root>
