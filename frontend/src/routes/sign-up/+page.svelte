<script lang="ts">
	import BigQuote from '@/lib/components/base/big-quote.svelte';
	import TealBackground from '@/lib/components/base/teal-background.svelte';
	import { Button } from '@/lib/components/ui/button';
	import { Input } from '@/lib/components/ui/input';
	import { Label } from '@/lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { sighUpPageHandler } from './page.svelte';
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign Up</h1>
				<p class="text-muted-foreground text-balance">Enter your details below to create your account</p>
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
				<Button variant="outline" class="w-full cursor-not-allowed" onclick={() => toast.error('You trust Google? Really???')}>Sign up with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/sign-in" class="underline"> Sign in </a>
			</div>
		</div>
	</div>
	<div class=" relative hidden lg:block">
		<TealBackground>
			<BigQuote author="Bob Alice">“Passwords are like underwear. Don’t let people see it, change it very often, and you shouldn’t share it with strangers”</BigQuote>
		</TealBackground>
	</div>
</div>
