<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { env } from "$env/dynamic/public";
</script>

<footer>
    <span>
        {m.landing_footer_madeby()}

        <a rel="noopener noreferrer" href="https://github.com/FlorianLeChat" target="_blank"> Florian Trayon 🐈 </a>

        <small>&copy; {new Date().getFullYear()}</small>
    </span>

    <small>
        <i class="fas fa-php"></i>

        <a href="https://legacy.florian-dev.fr/portfolio/">
            {m.landing_footer_legacy()}
        </a>
    </small>

    <code>
        {m.landing_footer_version( { version: env.PUBLIC_VERSION ?? "0.0.1" } )}
    </code>
</footer>
