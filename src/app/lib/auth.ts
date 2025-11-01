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

async function validateSessionToken(token: stirng): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) {
    return null;
  }
  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await getSession(sessionId);
  if (!session) return null;

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) return null;
}

async function getSession(sessionId: string): Promise<Session | null> {
  const now = new Date();

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (session === null) {
    return null;
  }

  if (
    now.getTime() - session.createdAt.getTime() >=
    sessionExpiresInSeconds * 1000
  ) {
    await deleteSession(sessionId);
    return null;
  }
  return session;
}

async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

function endcodeSessionPublicJSON(session: Session): string {
  const json = JSON.stringify({
    id: session.id,
    createdAt: Math.floor(session.createdAt.getTime() / 1000),
  });
  return json;
}

function verifyRequestOrigin(method: string, originHeader: string): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  if (method === "GET" || method === "HEAD") {
    return true;
  }
  return originHeader === "example.com";
}
