import crypto from "crypto";

export default function cipher(plaintext, password) {
  const algorithm = "aes-256-gcm";
  const key = crypto.pbkdf2Sync(
    (password + process.env.SITE_SECRET),
    Buffer.alloc(16),
    100000,
    32,
    "sha256",
  );

  const iv = Buffer.alloc(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
    
  let encryptedData = cipher.update(plaintext, "utf8", "base64");
  encryptedData += cipher.final("base64");

  const authTag = cipher.getAuthTag();

  return reverseStr(
    `${iv.toString("base64")}:${authTag.toString("base64")}:${encryptedData}`,
  );
}

export function reverseStr(str: string) {
  return str
    .split("")
    .map((val) => val)
    .reverse()
    .join("");
}
