export type Post = {
    title: string;
    link: string;
    date: string;
    excerpt: string;

    // Absolute URL of the first picture of the post, or an empty string.
    image: string;

    // BCP 47 tag of the language the post is written in.
    lang: string;
};
