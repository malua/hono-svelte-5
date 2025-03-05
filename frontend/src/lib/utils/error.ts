import { toast } from 'svelte-sonner';
import { ZodError } from 'zod';

export function toastResponseError(data: any) {
	if (data.error?.issues?.length) {
		const issues = (data.error as ZodError).issues;
		issues.forEach((issue, i) => {
			setTimeout(() => {
				toast.error(`Error at ${issue.path} value: ${issue.message}`);
			}, i * 500);
		});
		return;
	}

	if (data?.error?.message) {
		toast.error(data.error.message);
		return;
	}

	if (typeof data.error === 'string') {
		toast.error(data.error);
		return;
	}
	toast.error('An error occurred');
}
