vcl 4.1;

backend default {
	.host = "server";
	.port = "3000";
}

sub vcl_recv {
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#dont-allow-pri-requests
	if (req.method == "PRI") {
		return (synth(405));
	}

	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#enforce-the-host-header
	if (!req.http.host && req.esi_level == 0 && req.proto ~ "^(?i)HTTP/1.1") {
		return (synth(400));
	}

	# https://varnish-cache.org/docs/4.0/users-guide/increasing-your-hitrate.html#cookies-from-the-client
	if (req.http.Cookie) {
		unset req.http.Cookie;
	}

	# https://symfony.com/doc/current/http_cache/varnish.html#routing-and-x-forwarded-headers
	if (req.http.X-Forwarded-Proto == "https") {
		set req.http.X-Forwarded-Port = "443";
	} else {
		set req.http.X-Forwarded-Port = "80";
	}

	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#invalid-request-methods
	if (req.method != "GET" &&
		req.method != "HEAD" &&
		req.method != "PUT" &&
		req.method != "POST" &&
		req.method != "TRACE" &&
		req.method != "OPTIONS" &&
		req.method != "CONNECT" &&
		req.method != "DELETE") {
		return (pipe);
	}

	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#authorization-headers-and-cookies-are-not-cacheable
	if (req.http.Authorization) {
		return (pass);
	}

	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#uncacheable-request-methods
	if (req.method != "GET" && req.method != "HEAD") {
		return (pass);
	}

	if (req.url ~ "/assets" || req.url ~ "/_next") {
		return (hash);
	}

	return (hash);
}

sub vcl_deliver {
    unset resp.http.X-Varnish;

	if (obj.hits > 0) {
		set resp.http.X-Cache = "HIT";
	} else {
		set resp.http.X-Cache = "MISS";
	}

	set resp.http.X-Cache-Hits = obj.hits;

	return (deliver);
}
