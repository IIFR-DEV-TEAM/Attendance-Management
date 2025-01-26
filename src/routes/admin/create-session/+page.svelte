<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte';

  let date = $state();
  let startTime = $state();
  let endTime = $state();
  const generateSessionId = () =>{
    return `RW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  let sessionId = $state(generateSessionId());
  const createSession = async (event : Event) =>{
    event.preventDefault();

    if (!date || !startTime || !endTime) {
      alert('Please fill in all fields.');
      return;
    }

    const response = await fetch('/admin/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, startTime, endTime, sessionId }),
    });

    const result = await response.json();
    if (result.success) {
      alert(result.message || 'Session created successfully!');
      date = '';
      startTime = '';
      endTime = '';
      sessionId = generateSessionId();
    } else {
      alert(result.error || 'Failed to create session.');
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <a href="/admin" class="flex items-center text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to sessions
      </a>
    </div>

    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Create New Session
        </h3>
        <div class="mt-6">
          <form class="space-y-6" onsubmit={createSession}>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  bind:value={date}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="sessionId" class="block text-sm font-medium text-gray-700">
                  Session ID
                </label>
                <input
                  type="text"
                  name="sessionId"
                  id="sessionId"
                  value={sessionId}
                  disabled
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 sm:text-sm"
                />
              </div>

              <div>
                <label for="startTime" class="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  bind:value={startTime}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="endTime" class="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  bind:value={endTime}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
