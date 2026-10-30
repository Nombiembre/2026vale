import type { APIRoute } from "astro";
import { waitUntil } from "@vercel/functions";
import getLookUp from "~/utils/getLookUp";

// The rest of the site is prerendered. Only this endpoint runs on demand.
export const prerender = false;

export const POST: APIRoute = ({ request, url }) => {
	const task = getLookUp({ request, url });

	try {
		waitUntil(task);
	} catch {
		// Local development has no Vercel request context. The promise still
		// runs, but nothing needs to wait for it.
		void task;
	}

	return new Response(null, { status: 204 });
};
