<script>
	import { Badge } from '@/lib/components/ui/badge';

	const { tags } = $props();
</script>

{#each tags as tag (tag.name)}
	<Badge variant="outline" class="not-first-of-type:ml-1">
		{tag.name}
	</Badge>
{/each}
