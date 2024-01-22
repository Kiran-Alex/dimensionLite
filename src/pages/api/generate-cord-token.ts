import type { NextApiRequest, NextApiResponse } from 'next'
import { getClientAuthToken } from '@cord-sdk/server';
import { getServerAuthToken } from '@cord-sdk/server';
const CORD_APPLICATION_ID = '45d8b7c2-a324-4c6b-87f5-a8ddc5e41d53';
const CORD_SECRET = '6932129c3d03d690c892b1985189db387c07a59bd3cc93f5569aac9f3558e6d9';
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const clientAuthToken = getClientAuthToken(
        CORD_APPLICATION_ID,
        CORD_SECRET,
        {
          // The ID of the user we created with the CLI tool
          user_id: 'cordymccordface',
        },
      );
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify({ clientAuthToken }));
}