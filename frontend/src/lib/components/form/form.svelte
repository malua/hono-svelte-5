<script lang="ts">
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';
	import { Label } from '../ui/label';
	import { toast } from 'svelte-sonner';
	import { api } from '@/lib/utils/api';
	import type { Entry } from '@backend/api/entry';
	import MultiSelect from 'svelte-multiselect';
	import type { Tag } from '@backend/api/tag';

	type Props = {
		cancel: () => void;
		initialValues?: Entry;
		tags: Tag[];
	};

	let { cancel, initialValues = { name: '', tags: [], websiteUrl: '', githubUrl: '' }, tags }: Props = $props();

	let name = $state(initialValues.name);
	let websiteUrl = $state(initialValues.websiteUrl);
	let githubUrl = $state(initialValues.githubUrl);
	let selectedTags: string[] = $state([]);

	let isSubmitting = $state(false);

	const tagNames = tags?.map((tag) => tag.name) ?? [];

	async function handleSubmit() {
		isSubmitting = true;

		if (selectedTags?.length) {
			const newTags = selectedTags.filter((selectedTag) => !tagNames.includes(selectedTag));
			for (const tag of newTags) {
				await api.tag.add.$post({ json: { name: tag } });
			}
		} else {
			toast.error('Tags are required');
			isSubmitting = false;
			return;
		}

		// Basic validation
		if (!name) {
			toast.error('Name is required');
			isSubmitting = false;
			return;
		}

		// Parse tags from comma-separated string
		const formData: Entry = {
			name,
			tags: selectedTags,
			websiteUrl,
			githubUrl
		};

		await api.entry.add
			.$post({ json: formData })
			.catch((error) => {
				toast.error(error.message);
			})
			.then(() => {
				handleCancel();
			});

		isSubmitting = false;
	}

	function handleCancel() {
		cancel();
	}
</script>

<form onsubmit={handleSubmit} class="w-full space-y-6">
	<div class="grid w-full items-center gap-1.5">
		<Label for="name">Name*</Label>
		<Input id="name" bind:value={name} placeholder="Software name" required />
	</div>

	<div class="grid w-full items-center gap-1.5">
		<Label for="tags">Tags*</Label>
		<MultiSelect id="tags-select" options={tagNames} bind:selected={selectedTags} placeholder="Choose tags or create new ones" allowUserOptions="append" required let:idx let:option>
			<span id={idx}>{option}</span>
		</MultiSelect>
	</div>

	<div class="grid w-full items-center gap-1.5">
		<Label for="websiteUrl">Website URL</Label>
		<Input id="websiteUrl" bind:value={websiteUrl} placeholder="https://example.com" />
	</div>

	<div class="grid w-full items-center gap-1.5">
		<Label for="githubUrl">GitHub URL</Label>
		<Input id="githubUrl" bind:value={githubUrl} placeholder="https://github.com/username/repo" />
	</div>

	<div class="flex justify-end gap-2">
		<Button type="button" variant="outline" onclick={handleCancel}>Cancel</Button>
		<Button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Saving...' : 'Save Software'}
		</Button>
	</div>
</form>
