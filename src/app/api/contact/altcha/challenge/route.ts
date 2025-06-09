import { createChallenge } from 'altcha-lib'

const hmacKey = process.env.ALTCHA_HMAC_KEY

export async function GET() {
  // Create a new challenge and send it to the client:
  const challenge = await createChallenge({
    hmacKey: hmacKey as string,
    maxNumber: 100000, // the maximum random number
  })

  return Response.json(challenge)
}
