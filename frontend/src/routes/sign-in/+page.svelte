<script lang="ts">
	import BigQuote from '@/lib/components/core/big-quote.svelte';
	import TealBackground from '@/lib/components/core/teal-background.svelte';
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Input } from '@/lib/components/ui/input/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign In</h1>
				<p class="text-muted-foreground text-balance">
					Enter your email below to login to your account
				</p>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/sign-up" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="hidden lg:block relative">
		<TealBackground>
			<BigQuote>
				If security were all that mattered, computers would never be turned on, let alone hooked
				into a network with literally millions of potential intruders.
			</BigQuote>
		</TealBackground>
	</div>
</div>
