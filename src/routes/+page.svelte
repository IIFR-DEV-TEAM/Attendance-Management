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

  const teamMembers = [
    {
      name: 'Anurag Deb',
      linkedin: 'https://www.linkedin.com/in/anurag-deb-3685882b3/'
    },
    {
      name: 'Debapriya Mondal',
      linkedin: 'https://www.linkedin.com/in/debapriya-mondal-67b07130b/'
    },
    {
      name: 'Prithvi Raj Banik',
      linkedin: 'https://www.linkedin.com/in/prithvi-raj-banik-451a62319/'
    },
    {
      name: 'Sangram Keshari Patra',
      linkedin: 'https://www.linkedin.com/in/sangram-keshari-patra-a89205319/'
    },
  ];
</script>

<div class="min-h-screen bg-white">
  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-bold text-gray-900">Bigyan Labs</span>
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
          <span class="block text-blue-600">Attendance Management System</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Welcome to Bigyan Labs' attendance management system. Track your sessions and manage attendance efficiently.
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

      <!-- Team Section -->
      <div class="mt-32 pb-20">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Dedicated professionals working together to revolutionize attendance management
          </p>
        </div>

        <!-- Team Photo -->
        <div class="mt-12 flex justify-center">
          <div class="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co/prVqYHz/Team.webp"
              alt="Bigyan Labs Team"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Team Members -->
        <div class="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {#each teamMembers as member}
            <div class="text-center">
              <h3 class="text-lg font-medium text-gray-900">{member.name}</h3>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center mt-2 text-blue-600 hover:text-blue-500"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span class="ml-2">LinkedIn</span>
              </a>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>