import { api } from '@/lib/utils/api';

export const load = async () => {
	const entriesRes = await api.entry.list.$get();
	const { entries } = await entriesRes.json();

	const tagRes = await api.tag.list.$get();
	const { tags } = await tagRes.json();

	return {
		entries,
		tags
	};
};
