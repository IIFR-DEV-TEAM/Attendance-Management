<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    onMount(() => {
      setTimeout(() => {
        goto('/login');
      }, 5000);
    });
  </script>
  
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-xl font-semibold text-center mb-4">Attendance Updated Successfully</h1>
    <p class="text-gray-600 text-sm mb-6">You will be logged out shortly.</p>
    <div class="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
  </div>
  
  <style>
    .spinner {
      border: 4px solid #f3f3f3;
      border-top-color: #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 0.8s linear infinite;
    }
  
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  