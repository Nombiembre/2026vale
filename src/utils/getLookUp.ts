import { Resend } from "resend";
import type { AstroGlobal } from "astro";
import displayDate from "./displayTime";

const getClientIp = (request: Request): string | null => {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded
    ? forwarded.split(",")[0]
    : request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-real-ip") ||
        null;
};

const getLookUp = async (Astro: AstroGlobal) => {
  const clientIp = getClientIp(Astro.request) as string;
  const userAgent = Astro.request.headers.get("user-agent");
  const pathname = Astro.url.pathname;
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
    "America/Bogota"
  );


  const localip = import.meta.env.OWNIP;

  if (clientIp !== null && clientIp !== localip) {
    const resend = new Resend(import.meta.env.RESEND_APIKEY);
    await resend.emails.send({
      from: "ip@nombiembre.dev",
      to: "etoro@unicoc.edu.co",
      subject: "New Ip address",
      html: `
      <p>Ip: ${clientIp}</p>
      <p>Pathname: ${pathname}</p>
      <p>Date: ${date}</p>
      <p>User Agent: ${userAgent}</p>
      `,
      text: `Ip: ${clientIp}`,
    });
  }
};

export default getLookUp;
