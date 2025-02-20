<script lang="ts">
	import { onMount } from 'svelte';
	import { Clock, CheckCircle } from 'lucide-svelte';
	import { jwtDecode } from 'jwt-decode';
	import { goto } from '$app/navigation';
	let { data } = $props();
	let decoded = $state() as DecodedJWT;
	interface Session {
		sessionId: string;
		date: string;
		startTime: string;
		endTime: string;
		timeLeft: string;
		status: 'active' | 'expired';
		attended?: boolean;
	}

	interface DecodedJWT {
		userId: string;
		name:string;
		email: string;
		admin: boolean;
		iat: number;
		exp: number;
	}

	let currentSessions = $state([]) as Session[];
	let expiredSessions = $state([]) as Session[];

	const calculateTimeLeft = (session: Session): string => {
		const startTime = new Date(`${session.date}T${session.startTime}`);
		const currentTime = new Date();
		const endTime = new Date(`${session.date}T${session.endTime}`);
		const diffMs = endTime.getTime() - currentTime.getTime();
		if (diffMs <= 0) return 'Expired';
		const hours = Math.floor(diffMs / 3600000);
		const minutes = Math.floor((diffMs % 3600000) / 60000);
		return `${hours}h ${minutes}m`;
	};
	const updateSessions = () => {
		currentSessions = currentSessions.filter((session) => {
			const timeLeft = calculateTimeLeft(session);

			if (timeLeft === 'Expired') {
				expiredSessions.push({
					...session,
					timeLeft: 'Expired',
					status: 'expired',
					attended: false
				});

				return false;
			}

			session.timeLeft = timeLeft;
			return true;
		});
	};

	const joinSession = async (sessionId: string, userId: string) => {
		try {
			const res = await fetch('/student', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ sessionId, userId })
			});
			const { success }: { success: boolean } = await res.json();
			console.log(success);
			if (success) {
				await goto('/student/success');
			} else {
				await goto('/student/history');
			}
		} catch (error) {
			console.error('Error joining sessions', error);
			await goto('/student/history');
		}
	};

	onMount(async () => {
		try {
			const token = data.sessionid;
			if (token) {
				decoded = jwtDecode(token);
			} else {
				await goto('/login');
				console.warn('No sessionid cookie found.');
			}
			const res = await fetch('/api/session/fetch');
			if (res.ok) {
				const { sessions }: { sessions: Session[] } = await res.json();
				// console.log({sessions})
				currentSessions = [];
				expiredSessions = [];

				sessions.forEach(async (session) => {
					// console.log(session.startTime)
					const timeLeft = calculateTimeLeft(session);
					// console.log(timeLeft)

					if (timeLeft === 'Expired') {
						const attendedResponse = await fetch('/api/attendance/find', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ sessionId: session.sessionId, userId: decoded.userId })
						});
						const attendedData = await attendedResponse.json();
						if (!expiredSessions.find((s) => s.sessionId === session.sessionId)) {
							expiredSessions.push({
								...session,
								timeLeft: 'Expired',
								status: 'expired',
								attended: attendedData.success
							});
						}
					} else {
						currentSessions.push({
							...session,
							timeLeft,
							status: 'active'
						});
					}
				});

				setInterval(updateSessions, 60000);
			} else {
				console.error('Failed to fetch sessions:', await res.text());
			}
		} catch (error) {
			console.error('Error fetching sessions:', error);
		}
	});
</script>

<!-- UI -->
<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
			<h1 class="w-full text-center text-2xl font-bold text-gray-900 sm:w-auto">
				Spectrum 2025 Attendance
			</h1>
			<a
				href="/student/history"
				class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
			>
				<CheckCircle class="mr-2 h-4 w-4" />
				View Attendance History
			</a>
		</div>

		<!-- Current Sessions -->
		<div class="mb-8">
			<h2 class="mb-4 text-lg font-medium text-gray-900">Current & Upcoming Sessions</h2>
			{#if currentSessions.length > 0}
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each currentSessions as session}
						<div class="overflow-hidden rounded-lg bg-white shadow">
							<div class="p-4">
								<div class="flex items-start justify-between">
									<div>
										<p class="text-sm font-medium text-blue-600">Session ID: {session.sessionId}</p>
										<p class="mt-1 text-sm text-gray-500">Date: {session.date}</p>
									</div>
									<span
										class="rounded-full px-2 py-1 text-xs font-semibold
					{session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}"
									>
										{session.status === 'active' ? 'Active' : 'Upcoming'}
									</span>
								</div>
								<div class="mt-4 space-y-2">
									<div class="flex items-center text-sm text-gray-500">
										<Clock class="mr-2 h-4 w-4" />
										{session.startTime} - {session.endTime}
									</div>
									<div class="flex items-center text-sm font-medium text-blue-600">
										Time Left: {session.timeLeft}
									</div>
									<button
										class="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
										disabled={session.status !== 'active'}
										onclick={() => joinSession(session.sessionId, decoded.userId)}
									>
										{session.status === 'active' ? 'Join Session' : 'Opens Soon'}
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-center text-gray-500">No current or upcoming sessions available.</p>
			{/if}
		</div>

		<!-- Expired Sessions -->
		<div>
			<h2 class="mb-4 text-lg font-medium text-gray-900">Past Sessions</h2>
			{#if expiredSessions.length > 0}
				<div class="overflow-hidden bg-white shadow sm:rounded-lg">
					<ul class="divide-y divide-gray-200">
						{#each expiredSessions as session}
							<li class="opacity-75">
								<div class="px-4 py-4 sm:px-6">
									<div class="flex items-center justify-between">
										<div class="min-w-0 flex-1">
											<div class="flex items-center">
												<p class="truncate text-sm font-medium text-gray-600">
													Session ID: {session.sessionId}
												</p>
												<span
													class="ml-2 inline-flex rounded-full px-2 text-xs font-semibold leading-5
								{session.attended
															? 'bg-green-100 text-green-800'
															: 'bg-red-100 text-red-800'}"
												>
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
			{:else}
				<p class="text-center text-gray-500">No past sessions available.</p>
			{/if}
		</div>		
	</div>
</div>
