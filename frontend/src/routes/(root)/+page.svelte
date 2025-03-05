<script lang="ts">
	import { api } from '@/lib/utils/api';
	import { Button } from '@/lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { toastResponseError } from '@/lib/utils/error';
</script>

<!-- <Button
	onclick={async () => {
		try {
			const res = await api.user.$post({ json: { email: 'test@tesssts.cp', name: 'John' } });
			const data = await res.json();
			if (!res.ok) return toastResponseError(data);
			toast.success(`User with id ${data.id} created`);
		} catch (e) {
			console.info(e);
			toast.error("couldn't create user");
		}
	}}>Click me</Button
> -->
