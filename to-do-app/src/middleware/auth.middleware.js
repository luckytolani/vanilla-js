import fs from "fs";
import { tokenEncryption, tokenDecryption } from "./token.js";

export const checkLoggedIn = (token) => {
  try {
    let email = tokenDecryption(token);
    if (fs.existsSync("./sessions/session.json") && email) {
      const fileData =
        JSON.parse(fs.readFileSync("sessions/session.json")) || [];
      if (fileData?.find((user) => user === email)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const saveUser = (email) => {
  try {
    if (fs.existsSync("./sessions/session.json")) {
      const fileData = JSON.parse(fs.readFileSync("./sessions/session.json"));

      if (!fileData?.filter((user) => user === email)?.length) {
        fileData.push(email);
        fs.writeFileSync("./sessions/session.json", JSON.stringify(fileData, null, 2));
      }
      return tokenEncryption(email);
    } else {
      fs.writeFile(
        "./sessions/session.json",
        JSON.stringify([email], null, 2),
        (err, data) => {
          console.log(err, data);
        }
      );
      return tokenEncryption(email);
    }
  } catch (error) {
    console.log(error, "looks")
    return false
  }
};
