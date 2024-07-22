vcl 4.1;

backend default {
	.host = "node";
	.port = "3000";
}

sub vcl_recv {
	unset req.http.Cookie;

	if (req.http.X-Forwarded-Proto == "https") {
		set req.http.X-Forwarded-Port = "443";
	} else {
		set req.http.X-Forwarded-Port = "80";
	}

	if (req.method != "GET" &&
		req.method != "HEAD" &&
		req.method != "PUT" &&
		req.method != "POST" &&
		req.method != "TRACE" &&
		req.method != "OPTIONS" &&
		req.method != "DELETE") {
		return (pipe);
	}

	if (req.http.Authorization) {
		return (pass);
	}

	if (req.method != "GET" && req.method != "HEAD") {
		return (pass);
	}
}

sub vcl_backend_response {
	if (beresp.status >= 400 && beresp.status < 600) {
		set beresp.uncacheable = true;
		return (deliver);
	}

	set beresp.ttl = 5m;

	return (deliver);
}

sub vcl_deliver {
	if (obj.hits > 0) {
		set resp.http.X-Cache = "HIT";
	} else {
		set resp.http.X-Cache = "MISS";
	}

	set resp.http.X-Cache-Hits = obj.hits;
}