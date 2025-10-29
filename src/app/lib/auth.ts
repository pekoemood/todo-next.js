import { prisma } from "../../../prisma/client";

interface Session {
  id: string;
  secretHash: Uint8Array;
  createdAt: Date;
}

interface SessionWithToken extends Session {
  token: string;
}

function generateSecureRandomString() {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  const id = Array.from(bytes)
    .map((b) => alphabet[b >> 3])
    .join("");
  return id;
}

async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}

async function createSession(): Promise<SessionWithToken> {
  const now = new Date();

  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    secretHash,
    createdAt: now,
    token,
  };

  await prisma.session.create({
    data: {
      id: session.id,
      secretHash: session.secretHash,
      createdAt: session.createdAt,
    },
  });

  return session;
}

const sessionExpiresInSeconds = 60 * 60 * 24;

