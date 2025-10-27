interface Session {
  id: string;
  secretHash: Uint8Array;
  createdAt: Date;
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
