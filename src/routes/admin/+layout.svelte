<script>
    let title = 'Admin Dashboard';
  </script>
  
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white py-4 shadow-md">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-4">
        <h1 class="text-lg font-bold">{title}</h1>
        <a href="/" class="text-sm underline hover:text-gray-300">
          Logout
        </a>
      </div>
    </header>
  
    <main class="py-8 px-4 max-w-7xl mx-auto">
      <slot />
    </main>
  </div>
  