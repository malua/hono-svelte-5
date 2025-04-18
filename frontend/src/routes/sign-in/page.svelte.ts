import { goto } from '$app/navigation';
import { api } from '@/lib/utils/api';
import { toastResponseError } from '@/lib/utils/error';
import Cookies from 'js-cookie';
import userStore from '@/lib/stores/user.svelte';
import type { EnvUser } from '@backend/lib/types/app';

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

		const user = JSON.parse(decodeURI(Cookies.get('user-data') ?? 'null')) as EnvUser;
		userStore.setUser(user);
		goto('/');
	};
}

export const sighInPageHandler = new SighInPageHandler();
