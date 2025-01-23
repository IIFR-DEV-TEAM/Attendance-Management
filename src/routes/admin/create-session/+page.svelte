<script>
    let date = '';
    let startTime = '';
    let endTime = '';
  </script>
  
  <div class="bg-white shadow rounded-lg p-8 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Create New Session</h2>
  
    <form class="space-y-4">
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          bind:value={date}
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
  
      <div>
        <label for="startTime" class="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          id="startTime"
          bind:value={startTime}
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
  
      <div>
        <label for="endTime" class="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          id="endTime"
          bind:value={endTime}
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
  
      <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600"
      >
        Create Session
      </button>
    </form>
  </div>
  