
declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeAPIPromise: Promise<typeof YT> | null = null;

function loadYouTubeAPI(): Promise<typeof YT> {
  if (youtubeAPIPromise) return youtubeAPIPromise;

  youtubeAPIPromise = new Promise((resolve, reject) => {
    // Si ya está completamente cargado
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    // Si el script ya existe pero aún no está listo
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (existing) {
      const interval = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(interval);
          resolve(window.YT);
        }
      }, 50);

      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT as typeof YT);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () =>
      reject(new Error("Failed to load YouTube iframe_api"));

    document.head.appendChild(tag);
  });

  return youtubeAPIPromise;
}

export const getYoutubeApi = (): Promise<typeof YT> => {
  return loadYouTubeAPI();
};
