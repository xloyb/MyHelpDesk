import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/client'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Extract necessary data from the event payload
  const { id } = evt.data;
  const eventType = evt.type;

  // Handle user created or updated events
  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      const userData = {
        id: evt.data.id,
        email: JSON.parse(body).data.email_addresses[0].email_address,
        name: JSON.parse(body).data.username,
        avatar: JSON.parse(body).data.profile_image_url || '/img/noAvatar.png',
        cover: '/img/noCover.png',
      };

      if (eventType === 'user.created') {
        await prisma.user.create({
          data: userData,
        });
      } else if (eventType === 'user.updated') {
        await prisma.user.update({
          where: { id: evt.data.id },
          data: {
            email: userData.email,
            name: userData.name,
            avatar: userData.avatar,
            cover: userData.cover,
          },
        });
      }
    } catch (err) {
      console.error('Error processing webhook event:', err);
      return new Response('Failed to process webhook event', {
        status: 400,
      });
    }
  }




  return new Response('', { status: 200 })
}