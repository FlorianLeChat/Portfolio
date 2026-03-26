vcl 4.1;

backend default {
	.host = "server";
	.port = "3000";
}

sub vcl_recv {
	if (req.method == "PRI") {
		return (synth(405));
	}

	if (!req.http.host && req.esi_level == 0 && req.proto ~ "^(?i)HTTP/1.1") {
		return (synth(400));
	}

	if (req.http.Upgrade ~ "(?i)websocket") {
		return (pipe);
	}

	if (req.method != "GET" && req.method != "HEAD") {
		return (pass);
	}

	if (req.http.Authorization) {
		return (pass);
	}

	if (req.http.Cookie) {
		unset req.http.Cookie;
	}

	if (req.http.X-Forwarded-Proto == "https") {
		set req.http.X-Forwarded-Port = "443";
	} else {
		set req.http.X-Forwarded-Port = "80";
	}

	return (hash);
}

sub vcl_hash {
	if (req.http.Accept-Language) {
		hash_data(regsub(req.http.Accept-Language, "^([a-zA-Z-]+).*", "\1"));
	}
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

sub vcl_backend_response {
	if (beresp.http.Set-Cookie) {
		set beresp.uncacheable = true;
		return (deliver);
	}
}
