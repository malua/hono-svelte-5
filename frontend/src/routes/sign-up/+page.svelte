<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { Input } from '@/lib/components/ui/input';
	import { Label } from '@/lib/components/ui/label';
	import { sighUpPageHandler } from './page.svelte';
</script>

<div class="h-screen w-full">
	<div class="flex h-full items-center justify-center py-12">
		<div class="mx-auto grid min-w-xs gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign Up</h1>
				<p class="text-muted-foreground text-balance">Sign up is only allowed for whitelisted email addresses.</p>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input id="name" type="text" bind:value={sighUpPageHandler.name} placeholder="John Doe" required autocomplete="name" />
				</div>

				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" bind:value={sighUpPageHandler.email} type="email" placeholder="m@example.com" required autocomplete="email" />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" bind:value={sighUpPageHandler.password} type="password" required autocomplete="new-password" />
				</div>
				<Button type="submit" class="w-full" onclick={sighUpPageHandler.signUp}>Create Account</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/sign-in" class="underline"> Sign in </a>
			</div>
		</div>
	</div>
</div>
