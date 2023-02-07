import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default function handler( _request: NextApiRequest, result: NextApiResponse<Data> )
{
	result.status( 200 ).json( { name: "John Doe" } );
}