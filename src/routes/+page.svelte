<script>
  const features = [
    {
      name: 'Session Management',
      description: 'Create and manage workshop sessions with ease. Track attendance and monitor progress.',
      icon: '🔧'
    },
    {
      name: 'Real-time Tracking',
      description: 'Monitor attendance in real-time. Get instant updates on participant status.',
      icon: '📊'
    },
    {
      name: 'Detailed Analytics',
      description: 'Access comprehensive reports and analytics for better workshop management.',
      icon: '📈'
    }
  ];
</script>

<div class="min-h-screen bg-white">
  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-bold text-gray-900">IIFR Lab</span>
        </div>
        <a 
          href="/login"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <div class="relative pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Robotics Workshop</span>
          <span class="block text-blue-600">Attendance Management</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Welcome to IIFR Lab's robotics workshop attendance management system. Track your sessions and manage attendance efficiently.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each features as feature}
          <div class="relative p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                {feature.icon}
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

