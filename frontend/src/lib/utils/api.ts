import { hc } from 'hono/client';
import type { AppType } from '@backend/index';

export const { api } = hc<AppType>(
	import.meta.env.PROD ? 'https://backend.malua.workers.dev' : 'http://localhost:8000'
);
