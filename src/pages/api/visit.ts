import type { APIRoute } from "astro";
import { waitUntil } from "@vercel/functions";
import getLookUp from "~/utils/getLookUp";

// The rest of the site is prerendered. Only this endpoint runs on demand.
export const prerender = false;

const MAX_PATH_LENGTH = 2048;

const readPathname = async (request: Request, url: URL): Promise<string> => {
	try {
		const body = (await request.text()).trim();
		if (body.startsWith("/") && !body.startsWith("//")) {
			return body.slice(0, MAX_PATH_LENGTH);
		}
	} catch {
		// Ignore malformed bodies and fall back to the referer.
	}

	const referer = request.headers.get("referer");
	if (referer) {
		try {
			const refererUrl = new URL(referer);
			if (refererUrl.origin === url.origin) return refererUrl.pathname;
		} catch {
			// Ignore invalid referers.
		}
	}

	return "/";
};

export const POST: APIRoute = async ({ request, url }) => {
	const pathname = await readPathname(request, url);
	const task = getLookUp({ request, pathname });

	try {
		waitUntil(task);
	} catch {
		// Local development has no Vercel request context. The promise still
		// runs, but nothing needs to wait for it.
		void task;
	}

	return new Response(null, { status: 204 });
};
