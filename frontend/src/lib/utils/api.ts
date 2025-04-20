import { hc } from 'hono/client';
import type { AppType } from '@backend/index';

export const { api } = hc<AppType>(import.meta.env.PROD ? 'https://api.malua.dev' : 'http://localhost:8000', {
	fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => {
		return fetch(input, {
			...init,
			credentials: 'include'
		});
	}
});
