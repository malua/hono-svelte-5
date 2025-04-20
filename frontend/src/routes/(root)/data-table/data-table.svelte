<script lang="ts">
	import { Column, createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '@/lib/components/ui/table';
	import { Button } from '@/lib/components/ui/button';
	import Tags from '../tags/tags.svelte';
	import { api } from '@/lib/utils/api';
	import userStore from '@/lib/stores/user.svelte';
	import type { AnyPlugins } from 'svelte-headless-table/plugins';
	import { Image } from '@/lib/components/ui/image';

	const { software = [] } = $props();

	const user = userStore.user;

	const table = createTable(readable(software));

	const columnDefinitions: Column<any, AnyPlugins>[] = [
		table.column({
			id: 'icon',
			accessor: 'websiteUrl',
			header: '',
			cell: ({ value }) => {
				// Assuming the favicon is at the root as favicon.ico
				const url = new URL(value);
				return createRender(Image, {
					src: `https://favicone.com/${url.hostname}?s=24`,
					alt: 'Favicon of ' + value,
					class: ['w-6', 'h-6']
				});
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'entryTags',
			header: 'Tags',
			cell: ({ value }) => createRender(Tags, { tags: value.map((v) => v.tag) })
		}),
		table.column({
			accessor: 'websiteUrl',
			header: 'Website',
			cell: ({ value }) => createRender(Button, { variant: 'link', children: value, href: value, target: '_blank' })
		}),
		table.column({
			accessor: 'githubUrl',
			header: 'Github',
			cell: ({ value }) => createRender(Button, { variant: 'link', children: value, href: value, target: '_blank' })
		})
	];

	if (user) {
		columnDefinitions.push(
			table.column({
				accessor: ({ id }) => id,
				header: '',
				cell: ({ value }) =>
					createRender(Button, {
						variant: 'outline',
						children: 'Delete',
						onclick: async () => {
							await api.entry.delete[':id'].$delete({
								param: {
									id: value
								}
							});

							window.location.reload();
						}
					})
			})
		);
	}

	const columns = table.createColumns(columnDefinitions);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
