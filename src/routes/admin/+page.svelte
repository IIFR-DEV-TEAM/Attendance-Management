<script>
  import { Plus, Edit2 } from 'lucide-svelte';

  // Placeholder data
  const sessions = [
    {
      id: 'ROBO1234',
      date: '2024-01-23',
      startTime: '09:00',
      endTime: '12:00',
      status: 'active'
    },
    {
      id: 'ROBO5678',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '17:00',
      status: 'expired'
    },
    // Add more sessions as needed
  ];
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Session Management</h1>
      <a
        href="/admin/create-session"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        <Plus class="w-4 h-4 mr-2" />
        Create New Session
      </a>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        {#each sessions as session}
          <li>
            <div class="px-4 py-4 sm:px-6 {session.status === 'expired' ? 'opacity-60' : ''}">
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center">
                    <p class="text-sm font-medium text-blue-600 truncate">
                      Session ID: {session.id}
                    </p>
                    {#if session.status === 'expired'}
                      <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Expired
                      </span>
                    {/if}
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <span>Date: {session.date}</span>
                      <span class="mx-2">•</span>
                      <span>{session.startTime} - {session.endTime}</span>
                    </div>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    href="/admin/edit-session/{session.id}"
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit2 class="w-4 h-4 mr-2" />
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>