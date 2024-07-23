vcl 4.1;

backend default {
	# Redirection vers le serveur NodeJS.
	.host = "node";
	.port = "3000";
}

sub vcl_recv {
	# Suppression de tous les cookies sauf ceux
	#  nécessaires à l'application.
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
	if (req.http.X-Forwarded-Proto == "https") {
		set req.http.X-Forwarded-Port = "443";
	} else {
		set req.http.X-Forwarded-Port = "80";
	}

	# Suppression de la mise en cas en cache pour les requêtes
	#  ayant une méthode inconnue.
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
	if (req.http.Authorization) {
		return (pass);
	}

	# Suppression de la mise en cache pour les requêtes
	#  hors GET et HEAD.
	if (req.method != "GET" && req.method != "HEAD") {
		return (pass);
	}
}

sub vcl_backend_response {
	# Suppression de la mise en cache pour les réponses
	#  ayant une erreur en provenance du serveur.
	if (beresp.status >= 400 && beresp.status < 600) {
		set beresp.uncacheable = true;
		return (deliver);
	}

	# Mise en cache des requêtes ayant un code de statut
	#  valides pour une durée de 5 minutes.
	set beresp.ttl = 5m;

	return (deliver);
}

sub vcl_deliver {
	# Affichage de l'état de la mise en cache.
	if (obj.hits > 0) {
		set resp.http.X-Cache = "HIT";
	} else {
		set resp.http.X-Cache = "MISS";
	}

	set resp.http.X-Cache-Hits = obj.hits;

	return (deliver);
}