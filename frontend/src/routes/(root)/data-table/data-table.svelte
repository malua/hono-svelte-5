<script lang="ts">
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '@/lib/components/ui/table';
	import { Button } from '@/lib/components/ui/button';
	import Tags from '../tags/tags.svelte';

	const { software = [] } = $props();

	const table = createTable(readable(software));

	const columns = table.createColumns([
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
		// table.column({
		// 	accessor: ({ id }) => id,
		// 	header: '',
		// 	cell: ({ value }) => createRender(Button, { variant: 'link', children: '' })
		// })
	]);

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
