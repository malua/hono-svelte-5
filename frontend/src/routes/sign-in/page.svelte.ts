import { goto } from '$app/navigation';
import { api } from '@/lib/utils/api';
import { toastResponseError } from '@/lib/utils/error';

class SighInPageHandler {
	email = $state('');
	password = $state('');

	signIn = async () => {
		const serverRes = await api.user.signIn.$post({ json: { email: this.email, password: this.password } });
		const serverResData = await serverRes.json();
		if (!serverRes.ok) {
			toastResponseError(serverResData);
			return;
		}
		goto('/');
	};
}

export const sighInPageHandler = new SighInPageHandler();
