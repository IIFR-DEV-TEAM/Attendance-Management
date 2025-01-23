<script>
  import { Clock, CheckCircle } from 'lucide-svelte';
  let student_id;
  // Placeholder data - easily replaceable
  const currentSessions = [
    {
      id: 'ROBO1234',
      date: '2024-01-23',
      startTime: '09:00',
      endTime: '12:00',
      timeLeft: '2h 30m',
      status: 'active'
    },
    {
      id: 'ROBO5678',
      date: '2024-01-24',
      startTime: '14:00',
      endTime: '17:00',
      timeLeft: '4h 45m',
      status: 'upcoming'
    }
  ];

  const expiredSessions = [
    {
      id: 'ROBO9012',
      date: '2024-01-20',
      startTime: '10:00',
      endTime: '13:00',
      attended: true
    },
    {
      id: 'ROBO3456',
      date: '2024-01-19',
      startTime: '15:00',
      endTime: '18:00',
      attended: false
    }
  ];
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <h1 class="text-2xl font-bold text-gray-900 text-center w-full sm:w-auto">Student Dashboard</h1>
      <a
        href="/student/{student_id}/attendance"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        <CheckCircle class="w-4 h-4 mr-2" />
        View Attendance History
      </a>
    </div>

    <!-- Current Sessions -->
    <div class="mb-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Current & Upcoming Sessions</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each currentSessions as session}
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-blue-600">Session ID: {session.id}</p>
                  <p class="mt-1 text-sm text-gray-500">Date: {session.date}</p>
                </div>
                <span class="px-2 py-1 text-xs font-semibold rounded-full 
                  {session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                  {session.status === 'active' ? 'Active' : 'Upcoming'}
                </span>
              </div>
              <div class="mt-4 space-y-2">
                <div class="flex items-center text-sm text-gray-500">
                  <Clock class="w-4 h-4 mr-2" />
                  {session.startTime} - {session.endTime}
                </div>
                <div class="flex items-center text-sm font-medium text-blue-600">
                  Time Left: {session.timeLeft}
                </div>
                <button
                  class="w-full mt-2 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={session.status !== 'active'}
                >
                  {session.status === 'active' ? 'Join Session' : 'Opens Soon'}
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Past Sessions -->
    <div>
      <h2 class="text-lg font-medium text-gray-900 mb-4">Past Sessions</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul class="divide-y divide-gray-200">
          {#each expiredSessions as session}
            <li class="opacity-75">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-600 truncate">
                        Session ID: {session.id}
                      </p>
                      <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        {session.attended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        {session.attended ? 'Attended' : 'Missed'}
                      </span>
                    </div>
                    <div class="mt-2 flex">
                      <div class="flex items-center text-sm text-gray-500">
                        <span>Date: {session.date}</span>
                        <span class="mx-2">•</span>
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>

