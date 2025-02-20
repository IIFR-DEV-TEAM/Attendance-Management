<script lang="ts">
  import { ArrowLeft, Calendar, CheckCircle, XCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { jwtDecode } from 'jwt-decode';
	import type { DataType } from './+server.js';
	import type { SessionType } from 'models/Session.js';
  const {data} = $props()
  let decoded = $state() as DecodedJWT
  let userId = $state() as string
  interface AttendanceSession{
    sessionId: string;
    date: string;
    startTime: string;
    endTime: string;
    status?: 'attended' | 'missed';
    checkInTime?: string;
  }

  interface DecodedJWT {
		userId: string;
		name:string;
		email: string;
		admin: boolean;
		iat: number;
		exp: number;
	}

  let attendanceData = $state({
    totalSessions: 0,
    attendedSessions: 0,
    attendancePercentage: 0,
    sessions: [] as AttendanceSession[]
  })

  let loading = $state(true);
  const fetchAttendanceData = async () => {
    try {
      const sessionid = data.sessionid
      if(sessionid){
        decoded = jwtDecode(sessionid)
        userId = decoded.userId
      }
      const res = await fetch('/student/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:userId})
      });
      if (res.ok) {
        const data: DataType = await res.json();
        const sessionsWithStatus: AttendanceSession[] = [];
        for (const session of data.sessions) {
          console.log(session)
        try {
          const attendanceRes = await fetch('/api/attendance/find', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: session?.sessionId, userId }),
          });
          const status = attendanceRes.ok ? 'attended' : 'missed';
          sessionsWithStatus.push({ ...session, status });
        } catch (err) {
          console.error('Error fetching session attendance:', err);
          sessionsWithStatus.push({ ...session, status: 'missed' });
        }
      }
      attendanceData = {
        totalSessions: data.totalSessions,
        attendedSessions: data.attendedSessions,
        attendancePercentage: Math.round((data.attendedSessions / data.totalSessions) * 100) ? Math.round((data.attendedSessions / data.totalSessions) * 100) : 0,
        sessions: sessionsWithStatus,
      };
      console.log(attendanceData)
      } else {
        console.error('Failed to fetch attendance data:', await res.text());
        await goto('/login'); 
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    fetchAttendanceData();
  });
</script>

<!-- UI -->
<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <a href="/student" class="flex items-center text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Dashboard
      </a>
    </div>

    {#if loading}
      <!-- Loading State -->
      <div class="text-center text-gray-500">
        <p>Loading attendance data...</p>
      </div>
    {:else}
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
          {#if attendanceData.sessions.length > 0}
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
                            <span>Session ID: {session.sessionId}</span>
                            <span class="mx-2">•</span>
                            <span>{session.startTime} - {session.endTime}</span>
                            {#if session.checkInTime}
                              <span class="mx-2">•</span>
                              <span>Checked in: {session.checkInTime}</span>
                            {/if}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          {:else}
            <div class="px-4 py-5 sm:px-6 text-center text-gray-500">
              <p>No attendance records available.</p>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
