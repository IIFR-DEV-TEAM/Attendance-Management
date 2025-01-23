<script>
    const currentSessions = [
      { date: '2025-01-23', startTime: '10:00 AM', endTime: '12:00 PM', sessionId: '12345678' },
    ];
  
    const pastSessions = [
      { date: '2025-01-20', startTime: '11:00 AM', endTime: '1:00 PM', sessionId: '87654321' },
    ];
  </script>
  
  <div class="space-y-8">
    <!-- Create Session Button -->
    <div class="flex justify-end">
      <a
        href="/admin/create-session"
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600"
      >
        Create Session
      </a>
    </div>
  
    <!-- Current Sessions -->
    <div>
      <h2 class="text-lg font-bold mb-4">Current Sessions</h2>
      <div class="space-y-4">
        {#each currentSessions as session}
          <div class="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            <div>
              <p class="font-semibold">Session ID: {session.sessionId}</p>
              <p>{session.date} | {session.startTime} - {session.endTime}</p>
            </div>
            <a
              href={`/admin/edit-session?sessionId=${session.sessionId}`}
              class="bg-gray-100 text-blue-600 font-semibold py-1 px-3 rounded hover:bg-gray-200"
            >
              Edit
            </a>
          </div>
        {/each}
      </div>
    </div>
  
    <!-- Past Sessions -->
    <div>
      <h2 class="text-lg font-bold mb-4">Past Sessions</h2>
      <div class="space-y-4">
        {#each pastSessions as session}
          <div class="bg-gray-200 shadow rounded-lg p-4 text-gray-500">
            <p class="font-semibold">Session ID: {session.sessionId}</p>
            <p>{session.date} | {session.startTime} - {session.endTime}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  