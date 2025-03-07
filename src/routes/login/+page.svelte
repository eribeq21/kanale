<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="bg-gray-100 flex justify-center items-center h-screen">
	<!-- Left: Image -->
	<div class="w-1/2 h-screen hidden lg:block">
		<img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" class="object-cover w-full h-full">
	</div>
	
	<!-- Right: Login Form -->
	<div class="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
		<h1 class="text-2xl font-semibold mb-4">Login</h1>
		<form action="?/login" method="POST" use:enhance class="space-y-4">
			<!-- Email Input -->
			<div>
				<label for="email" class="block text-gray-600">E-Mail</label>
				<input type="text" id="email" name="email" required class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
			</div>
			<!-- Password Input -->
			<div>
				<label for="password" class="block text-gray-600">Password</label>
				<input type="password" id="password" name="password" required class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
			</div>
			<!-- Remember Me Checkbox -->
			<div class="flex items-center">
				<input type="checkbox" id="remember" name="remember" class="text-blue-500">
				<label for="remember" class="text-gray-600 ml-2">Remember Me</label>
			</div>
			<!-- Forgot Password Link -->
			<div class="text-blue-500">
				<a href="#" class="hover:underline">Forgot Password?</a>
			</div>
			<!-- Login Button -->
			<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
			<!-- Warning Message -->
			{#if form}
				<Warning message={form.message} />
			{/if}
		</form>
		<!-- Sign up Link -->
		<div class="mt-6 text-blue-500 text-center">
			<a href="#" class="hover:underline">Sign up Here</a>
		</div>
	</div>
</div>