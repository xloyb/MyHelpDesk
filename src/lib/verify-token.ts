import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client'; // Adjust the import based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ valid: false });
  }

  try {
    const tokenExists = await prisma.ticket.findUnique({
      where: {
        token: token,
      },
    });

    if (tokenExists) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(404).json({ valid: false });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ valid: false });
  }
}
