<script>
	const { children, author = 'Anonymous' } = $props();
</script>

<figure>
	<blockquote class="relative">
		<span class="absolute -top-12 left-0 text-6xl text-white/20 font-mono">"</span>
		<p class="text-2xl font-light leading-relaxed italic">
			{@render children()}
		</p>
		<span class="absolute -bottom-8 right-0 text-6xl text-white/20 font-mono">"</span>
	</blockquote>
	<figcaption class="mt-10 text-sm text-white/70">∼ {author} ∽</figcaption>
</figure>
