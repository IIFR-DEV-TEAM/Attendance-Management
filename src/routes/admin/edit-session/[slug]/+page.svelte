<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import type { SessionType } from 'models/Session';
	import { onMount } from 'svelte';
	let { data } = $props();
	let slug = data?.slug;
	let startTime = $state() as string;
	let endTime = $state() as string;
	let date = $state() as string;

	const normalizeTime = (time: string): string => {
		if (time.split(':').length === 3) {
			return time;
		}
		return `${time}:00`;
	};

	let session = $state() as SessionType;
	const getSession = async (sessionId: string) => {
		const res = await fetch('/api/session/find', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ sessionId })
		});
		const { session }: { session: SessionType } = await res.json();
		return session;
	};
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = {
			sessionId: slug,
			date,
			startTime: normalizeTime(startTime),
			endTime: normalizeTime(endTime)
		};
		try {
			const res = await fetch('/api/session/edit', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({data})
			});
			if (res.ok) {
				return 'Edition Successfull';
			}
			return 'Could not Edit';
		} catch (error) {
			return 'Server error';
		}
	};

	onMount(async () => {
		session = await getSession(data.slug);
		(date = session.date), (startTime = session.startTime), (endTime = session.endTime);
	});
</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8">
			<a href="/admin" class="flex items-center text-sm text-gray-500 hover:text-gray-900">
				<ArrowLeft class="mr-2 h-4 w-4" />
				Back to sessions
			</a>
		</div>

		<div class="bg-white shadow sm:rounded-lg">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Edit Session</h3>
				<div class="mt-6">
					<form class="space-y-6" onsubmit={handleSubmit}>
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label for="date" class="block text-sm font-medium text-gray-700"> Date </label>
								<input
									type="date"
									name="date"
									id="date"
									bind:value={date}
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
									value={data.slug}
									disabled
									class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm sm:text-sm"
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
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
								/>
							</div>
						</div>

						<div class="flex justify-end space-x-3">
							<button
								type="button"
								class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Delete Session
							</button>
							<button
								type="submit"
								class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
