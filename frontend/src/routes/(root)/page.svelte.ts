import { goto } from '$app/navigation';
import { api } from '@/lib/utils/api';
import { toastResponseError } from '@/lib/utils/error';

class RootPageHandler {
	signOut = async () => {
		const serverRes = await api.user.signOut.$post();
		const serverResData = await serverRes.json();

		if (!serverRes.ok) {
			toastResponseError(serverResData);
			return;
		}
		await goto('/');
		window.location.reload();
	};
}

export const rootPageHandler = new RootPageHandler();
