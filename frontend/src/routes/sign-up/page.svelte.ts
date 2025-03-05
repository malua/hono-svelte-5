import { api } from '@/lib/utils/api';
import { toastResponseError } from '@/lib/utils/error';
import { toast } from 'svelte-sonner';

class SighUpPageHandler {
	name = $state('');
	email = $state('');
	password = $state('');
	constructor() {}
	signUp = async () => {
		const serverRes = await api.user.signUp.$post({ json: { email: this.email, password: this.password, name: this.name } });
		const serverResData = await serverRes.json();
		if (!serverRes.ok) {
			toastResponseError(serverResData);
			return;
		}
		toast.success('User created successful');
	};
}

export const sighUpPageHandler = new SighUpPageHandler();
