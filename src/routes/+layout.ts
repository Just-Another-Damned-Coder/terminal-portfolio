export const prerender = false;
export const ssr = false;

export const load = async ({ fetch }) => {
	const res = await fetch('/filesystem.json');
	if (!res.ok) throw new Error('Could not load filesystem.json');
	const filesystem = await res.json();
	return { filesystem };
};