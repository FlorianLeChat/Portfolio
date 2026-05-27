<script lang="ts">
    import * as m from "$lib/locales/messages";

    const sendMail = async ( event: MouseEvent ) =>
    {
        event.preventDefault();

        const Swal = ( await import( "sweetalert2" ) ).default;
        const { value: service } = await Swal.fire( {
            icon: "question",
            text: m.modals_mailer_description(),
            title: m.modals_mailer_title(),
            input: "radio",
            inputOptions: {
                google: m.modals_mailer_google(),
                default: m.modals_mailer_default()
            },
            inputValidator: ( value ) => ( !value && m.modals_mailer_error() ) || null
        } );

        switch ( service )
        {
            case "google":
                window.open( "https://mail.google.com/mail/?view=cm&fs=1&to=contact@florian-dev.fr", "_blank" );
                break;

            case "default":
                window.open( "mailto:contact@florian-dev.fr", "_blank" );
                break;
        }
    };
</script>

<section id="contact">
    <h2>{m.landing_header_contact()}</h2>

    <ul>
        <li>
            <button type="button" onclick={sendMail}>
                <i class="fas fa-envelope"></i>
                {m.landing_footer_mail()}
            </button>
        </li>

        <li>
            <a rel="noopener noreferrer" href="https://github.com/FlorianLeChat" target="_blank">
                <i class="fas fa-github"></i>
                GitHub
            </a>
        </li>

        <li>
            <a rel="noopener noreferrer" href="https://www.linkedin.com/in/florian-trayon/" target="_blank">
                <i class="fab fa-linkedin-in"></i>
                LinkedIn
            </a>
        </li>
    </ul>
</section>
