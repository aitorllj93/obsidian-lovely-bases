

export type ExternalMediaType = 'youtube';

export type ExternalMediaObject = {
  type: ExternalMediaType;
  id?: string;
  value: string;
}

function buildYouTubeEmbedSrc(
  id: string,
  opts?: { autoPlay?: boolean; loop?: boolean; controls?: boolean; }
) {
  const { autoPlay = true, controls = false, loop = false } = opts ?? {};
  const src = new URL(`https://www.youtube.com/embed/${id}`);

  src.searchParams.set("playsinline", "1");
  src.searchParams.set("rel", "0");
  src.searchParams.set("modestbranding", "1");
  src.searchParams.set("disablekb", "1");
  src.searchParams.set("fs", "0");
  src.searchParams.set("enablejsapi", "1");

  if (autoPlay) {
    src.searchParams.set("autoplay", "1");
    src.searchParams.set("mute", "1"); // clave para que el navegador permita autoplay
  }

  if (!controls) {
    src.searchParams.set("controls", "0");
  }

  if (loop) {
    src.searchParams.set("loop", "1");
    src.searchParams.set("playlist", id); // necesario para loop en YouTube
  }

  return src.toString();
}

export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);

    // youtu.be/ID
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;

    // m.youtube.com / www.youtube.com / youtube.com
    const host = u.hostname.replace(/^www\./, "");
    if (host.endsWith("youtube.com")) {
      // /watch?v=ID
      const v = u.searchParams.get("v");
      if (v) return v;

      // /embed/ID
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.split("/embed/")[1];
        return id ? id.split("/")[0] : null;
      }

      // /shorts/ID
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1];
        return id ? id.split("/")[0] : null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getExternalMedia(url: string): ExternalMediaObject | null {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return {
      type: "youtube",
      id: ytId,
      value: buildYouTubeEmbedSrc(ytId, { autoPlay: true, loop: true }),
    };
  }

  return null;
}
