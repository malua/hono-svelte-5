<script lang="ts">
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Input } from '@/lib/components/ui/input/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import { sighInPageHandler } from './page.svelte';
</script>

<div class="h-screen w-full">
	<div class="flex h-full items-center justify-center py-12">
		<div class="mx-auto grid min-w-xs gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign In</h1>
				<p class="text-muted-foreground text-balance">Enter your email below to login to your account</p>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" bind:value={sighInPageHandler.email} type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<!-- <a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a> -->
					</div>
					<Input id="password" bind:value={sighInPageHandler.password} type="password" required />
				</div>
				<Button type="submit" class="w-full" onclick={sighInPageHandler.signIn}>Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/sign-up" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
</div>
