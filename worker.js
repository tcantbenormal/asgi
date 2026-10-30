// Runs in front of the static assets. One job: send www.asgi.app to asgi.app so every
// visitor uses the same host. The CARTO basemap key is locked to that host, and search
// engines should see one address. Everything else is served from ./dist by Cloudflare.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
