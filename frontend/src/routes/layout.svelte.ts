import Cookies from 'js-cookie';
import userStore from '@/lib/stores/user.svelte';
import { page } from '$app/state';
import type { EnvUser } from '@backend/lib/types/app';
import { goto } from '$app/navigation';

export function authBasedRedirection() {
	const user = JSON.parse(decodeURI(Cookies.get('user-data') ?? 'null')) as EnvUser;
	userStore.setUser(user);
	const authPaths = ['/sign-in', '/sign-up'];
	const publicPaths = [...authPaths, '/']; // and more...
	const isPublicPath = publicPaths.includes(page.url.pathname);
	const isAuthPath = authPaths.includes(page.url.pathname);

	if (!user && !isPublicPath) {
		goto('/sign-in');
	}
	if (user && isAuthPath) {
		goto('/');
	}
}
