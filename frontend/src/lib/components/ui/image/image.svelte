<script lang="ts">
	import { cn } from '@/lib/utils/cn';

	let { src, alt, class: className }: { src: string; alt: string; class: string[] } = $props();
</script>

<img {src} {alt} class={cn(className)} />
