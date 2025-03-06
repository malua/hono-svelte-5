import type { EnvUser } from '@backend/lib/types/app';

class UserStore {
	user = $state<EnvUser>(null);
	setUser(user: EnvUser) {
		this.user = user;
	}
}

const userStore = new UserStore();
export default userStore;
