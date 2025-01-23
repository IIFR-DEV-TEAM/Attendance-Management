<script>
  import { ArrowLeft, Calendar, CheckCircle, XCircle } from 'lucide-svelte';
  const attendanceData = {
    totalSessions: 15,
    attendedSessions: 12,
    attendancePercentage: 80,
    sessions: [
      {
        id: 'ROBO1234',
        date: '2024-01-20',
        startTime: '09:00',
        endTime: '12:00',
        status: 'attended',
        checkInTime: '09:05'
      },
      {
        id: 'ROBO5678',
        date: '2024-01-19',
        startTime: '14:00',
        endTime: '17:00',
        status: 'missed'
      },
      {
        id: 'ROBO9012',
        date: '2024-01-18',
        startTime: '10:00',
        endTime: '13:00',
        status: 'attended',
        checkInTime: '10:00'
      }
    ]
  };
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <a href="/student" class="flex items-center text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Dashboard
      </a>
    </div>

    <!-- Attendance Overview -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Attendance History</h1>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500">Total Sessions</div>
          <div class="mt-2 flex items-baseline">
            <div class="text-3xl font-semibold text-gray-900">{attendanceData.totalSessions}</div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500">Sessions Attended</div>
          <div class="mt-2 flex items-baseline">
            <div class="text-3xl font-semibold text-gray-900">{attendanceData.attendedSessions}</div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500">Attendance Rate</div>
          <div class="mt-2 flex items-baseline">
            <div class="text-3xl font-semibold text-gray-900">{attendanceData.attendancePercentage}%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed History -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-lg font-medium text-gray-900">Detailed History</h2>
      </div>
      <div class="border-t border-gray-200">
        <ul class="divide-y divide-gray-200">
          {#each attendanceData.sessions as session}
            <li>
              <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center">
                      <Calendar class="w-5 h-5 text-gray-400 mr-2" />
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {session.date}
                      </p>
                      {#if session.status === 'attended'}
                        <CheckCircle class="ml-2 w-5 h-5 text-green-500" />
                      {:else}
                        <XCircle class="ml-2 w-5 h-5 text-red-500" />
                      {/if}
                    </div>
                    <div class="mt-2">
                      <div class="flex items-center text-sm text-gray-500">
                        <span>Session ID: {session.id}</span>
                        <span class="mx-2">•</span>
                        <span>{session.startTime} - {session.endTime}</span>
                        {#if session.checkInTime}
                          <span class="mx-2">•</span>
                          <span>Checked in: {session.checkInTime}</span>
                        {/if}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full 
                      {session.status === 'attended' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                      {session.status === 'attended' ? 'Attended' : 'Missed'}
                    </span>
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

