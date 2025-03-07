<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="bg-gray-100 flex justify-center items-center h-screen">
	<!-- Left: Image -->
	<div class="w-full md:w-1/2 h-screen hidden md:block">
		<img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" class="object-cover w-full h-full">
	</div>
	
	<!-- Right: Login Form -->
	<div class="w-full md:w-1/2 p-6 sm:p-8 md:p-16 lg:p-36 flex flex-col justify-center">
		<h1 class="text-3xl font-semibold mb-6 text-center md:text-4xl">Login</h1>
		<form action="?/login" method="POST" use:enhance class="space-y-6">
			<!-- Email Input -->
			<div>
				<label for="email" class="block text-gray-600 text-sm md:text-base">E-Mail</label>
				<input type="text" id="email" name="email" required class="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-blue-500" autocomplete="off" />
			</div>
			<!-- Password Input -->
			<div>
				<label for="password" class="block text-gray-600 text-sm md:text-base">Password</label>
				<input type="password" id="password" name="password" required class="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-blue-500" autocomplete="off" />
			</div>
			<!-- Remember Me Checkbox -->
			<div class="flex items-center text-sm md:text-base">
				<input type="checkbox" id="remember" name="remember" class="text-blue-500">
				<label for="remember" class="text-gray-600 ml-2">Remember Me</label>
			</div>
			<!-- Forgot Password Link -->
			<div class="text-blue-500 text-sm md:text-base">
				<a href="#" class="hover:underline">Forgot Password?</a>
			</div>
			<!-- Login Button -->
			<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-6 w-full text-lg md:text-xl">Login</button>
			<!-- Warning Message -->
			{#if form}
				<Warning message={form.message} />
			{/if}
		</form>
		<!-- Sign up Link -->
		<div class="mt-6 text-blue-500 text-center text-sm md:text-base">
			<a href="#" class="hover:underline">Sign up Here</a>
		</div>
	</div>
</div>
