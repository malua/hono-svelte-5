<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { rootPageHandler } from './page.svelte';
</script>

<Button class="cursor-pointer" onclick={rootPageHandler.signOut}>Sign Out</Button>
