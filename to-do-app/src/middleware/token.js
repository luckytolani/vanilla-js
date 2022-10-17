import crypto from "crypto";

export const tokenEncryption = (email) => {
  try {
    const cipher = crypto.createCipher("aes192", "a token");
    let encrypted = cipher.update(email, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  } catch (error) {
    return null;
  }
};

export const tokenDecryption = (token) => {
  try {
    const decipher = crypto.createDecipher("aes192", "a token");
    let decrypted = decipher.update(token, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    return null
  }
};
