interface Session {
  id: string;
  secretHash: Uint8Array;
  createAt: Date;
}