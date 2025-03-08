vcl 4.1;

backend default {
	# Redirection vers le serveur NodeJS.
	.host = "node";
	.port = "3000";
}

sub vcl_recv {
	# Blocage des requêtes HTTP/2 de type PRI.
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#dont-allow-pri-requests
	if (req.method == "PRI") {
		return (synth(405));
	}

	# Blocage des requêtes HTTP/1.1 sans en-tête Host.
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#enforce-the-host-header
	if (!req.http.host && req.esi_level == 0 && req.proto ~ "^(?i)HTTP/1.1") {
		return (synth(400));
	}

	# Suppression de tous les cookies sauf ceux
	#  nécessaires à l'application.
	# https://varnish-cache.org/docs/4.0/users-guide/increasing-your-hitrate.html#cookies-from-the-client
	if (req.http.Cookie) {
		set req.http.Cookie = ";" + req.http.Cookie;
		set req.http.Cookie = regsuball(req.http.Cookie, "; +", ";");
		set req.http.Cookie = regsuball(req.http.Cookie, ";(NEXT_COOKIE|NEXT_LOCALE|NEXT_THEME)=", "; \1=");
		set req.http.Cookie = regsuball(req.http.Cookie, ";[^ ][^;]*", "");
		set req.http.Cookie = regsuball(req.http.Cookie, "^[; ]+|[; ]+$", "");

		if (req.http.Cookie == "") {
			unset req.http.Cookie;
		}
	}

	# Définition du port en fonction du protocole.
	# https://symfony.com/doc/current/http_cache/varnish.html#routing-and-x-forwarded-headers
	if (req.http.X-Forwarded-Proto == "https") {
		set req.http.X-Forwarded-Port = "443";
	} else {
		set req.http.X-Forwarded-Port = "80";
	}

	# Suppression de la mise en cas en cache pour les requêtes
	#  ayant une méthode inconnue.
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#invalid-request-methods
	if (req.method != "GET" &&
		req.method != "HEAD" &&
		req.method != "PUT" &&
		req.method != "POST" &&
		req.method != "TRACE" &&
		req.method != "OPTIONS" &&
		req.method != "DELETE") {
		return (pipe);
	}

	# Suppression de la mise en cas pour les requêtes
	#  ayant des données d'autorisation.
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#authorization-headers-and-cookies-are-not-cacheable
	if (req.http.Authorization) {
		return (pass);
	}

	# Suppression de la mise en cache pour les requêtes
	#  hors GET et HEAD.
	# https://www.varnish-software.com/developers/tutorials/varnish-builtin-vcl/#uncacheable-request-methods
	if (req.method != "GET" && req.method != "HEAD") {
		return (pass);
	}

	# Mise en cache des ressources statiques générées par NextJS.
	if (req.url ~ "/assets" || req.url ~ "/_next") {
		return (hash);
	}

	# Passage de la requête au back-end sans mise en cache.
	return (pass);
}

sub vcl_deliver {
	# Suppression de certains en-têtes HTTP dans la réponse.
	unset resp.http.Via;

	# Affichage de l'état de la mise en cache.
	if (obj.hits > 0) {
		set resp.http.X-Cache = "HIT";
	} else {
		set resp.http.X-Cache = "MISS";
	}

	set resp.http.X-Cache-Hits = obj.hits;

	return (deliver);
}