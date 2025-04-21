<script>
	import { Badge } from '@/lib/components/ui/badge';

	const { tags } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag (tag.name)}
		<Badge variant="outline">
			{tag.name}
		</Badge>
	{/each}
</div>
