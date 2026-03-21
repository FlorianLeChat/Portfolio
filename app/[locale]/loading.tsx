import { fetchMetadata } from "@/utilities/metadata";

export default async function Loading()
{
    const { title } = ( await fetchMetadata() ) as { title: string };

    return <div className="loading">📚 {title}</div>;
}
