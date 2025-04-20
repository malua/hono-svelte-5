import { goto } from '$app/navigation';
import { api } from '@/lib/utils/api';
import { toastResponseError } from '@/lib/utils/error';

class SighUpPageHandler {
	name = $state('');
	email = $state('');
	password = $state('');
	inviteCode = $state('');

	signUp = async () => {
		const serverRes = await api.user.signUp.$post({
			json: { email: this.email, password: this.password, name: this.name, inviteCode: this.inviteCode }
		});
		const serverResData = await serverRes.json();
		if (!serverRes.ok) {
			toastResponseError(serverResData);
			return;
		}
		goto('/');
	};
}

export const sighUpPageHandler = new SighUpPageHandler();
