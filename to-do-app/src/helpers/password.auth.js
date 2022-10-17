import crypto from "crypto";

export const passMatch = (hash, password) => {
  const decipher = crypto.createDecipher("aes192", "a password");
  let decrypted = decipher.update(hash, "hex", "utf8");
  decrypted += decipher.final("utf8");
  if (decrypted === password) return true;
  else return false;
};

export const encryption = (password) => {
  const cipher = crypto.createCipher("aes192", "a password");
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};
