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
}