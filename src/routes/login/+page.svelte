<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let userId = $state('')
  let password = $state('')
  let error = $state('')

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await goto('/student');
      } else {
        const { error: errorMessage } = await response.json();
        error = errorMessage || 'Something went wrong.';
      }
    } catch (err) {
      console.error('Login error:', err);
      error = 'Unable to connect to the server. Please try again later.';
    }
  };
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <a href="/" class="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
      <ArrowLeft class="w-4 h-4 mr-2" />
      Back to home
    </a>
    <h2 class="text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" onsubmit={handleSubmit}>
        <div>
          <label for="userId" class="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <div class="mt-1">
            <input
              id="userId"
              name="userId"
              type="text"
              bind:value={userId}
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              bind:value={password}
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {#if error}
          <div class="text-red-500 text-sm">{error}</div>
        {/if}

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
