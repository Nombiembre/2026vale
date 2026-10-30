import { Resend } from "resend";
import displayDate from "./displayTime";

const env = (key: "RESEND_APIKEY" | "OWNIP"): string | undefined =>
	process.env[key] || import.meta.env[key];

/**
 * Small, privacy-conscious "someone opened the site" notifier.
 *
 * It runs from the on-demand `/api/visit` endpoint, which the layout pings once
 * per page load. The site itself stays static and a failure here can never
 * break the page.
 */
export interface LookUpContext {
	request: Request;
	pathname: string;
}

const getClientIp = (request: Request): string | null => {
	const forwarded = request.headers.get("x-forwarded-for");
	return (
		forwarded?.split(",")[0]?.trim() ||
		request.headers.get("cf-connecting-ip") ||
		request.headers.get("x-real-ip") ||
		null
	);
};

const escapeHtml = (value: string): string =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

const getLookUp = async ({ request, pathname }: LookUpContext): Promise<void> => {
	try {
		const apiKey = env("RESEND_APIKEY");
		if (!apiKey) return;

		const clientIp = getClientIp(request);
		if (!clientIp) return;

		// Requests made by the author are not reported.
		if (clientIp === env("OWNIP")) return;

		const userAgent = request.headers.get("user-agent") ?? "desconocido";
		const date = displayDate(
			new Date(),
			{
				day: "2-digit",
				month: "long",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			},
			"America/Bogota",
		);

		const resend = new Resend(apiKey);
		await resend.emails.send({
			from: "ip@nombiembre.dev",
			to: "emanuelt.marin9@gmail.com",
			subject: "New Ip address",
			html: `
      <p>Ip: ${escapeHtml(clientIp)}</p>
      <p>Pathname: ${escapeHtml(pathname)}</p>
      <p>Date: ${escapeHtml(date)}</p>
      <p>User Agent: ${escapeHtml(userAgent)}</p>
      `,
			text: `Ip: ${clientIp}`,
		});
	} catch (error) {
		// Never let the notifier take down a page.
		console.error("[getLookUp]", error);
	}
};

export default getLookUp;
