import fs from "fs";
import * as passwordFile from "../helpers/password.auth.js";
import { saveUser } from "../middleware/auth.middleware.js";

export const signup = (email, password) => {
  try {
    console.log(email, password);
    if (fs.existsSync("./db/user.json")) {
      const fileData = JSON.parse(fs.readFileSync("./db/user.json"));

      let hashPwd = passwordFile.encryption(password);
      if (uniqueUser(fileData, email)) {
        fileData.push({ email, password: hashPwd });

        fs.writeFileSync("./db/user.json", JSON.stringify(fileData, null, 2));

        return { status: true, message: "success" , token: saveUser(email)};
      }
      return { status: false, message: "Email already exists" };
    } else {
      let hashPwd = passwordFile.encryption(password);
      let user = [
        {
          email,
          password: hashPwd,
        },
      ];
      fs.writeFile("./db/user.json", JSON.stringify(user, null, 2));

      return { status: true, message: "success" , token: saveUser(email)};
    }
  } catch (error) {
    return { status: false, message: "Something went wrong", error };
  }
};

export const login = (email, password) => {
  try {
    if (fs.existsSync("./db/user.json")) {
      const fileData = JSON.parse(fs.readFileSync("./db/user.json"));
      let user = findUser(fileData, email);

      if (user) {
        if (passwordFile.passMatch(user.password, password)) {
          return { status: true, message: "Success", token: saveUser(email) };
        } else {
          return { status: false, message: "Password Incorrect" };
        }
      } else {
        return { status: false, message: "User Not found please signup" };
      }
    } else {
      return { status: false, message: "User not exists" };
    }
  } catch (error) {
    return { status: false, message: "Something went wrong", error };
  }
};

export const changePass = (email, oldPassword, newPassword) => {
  return { status: true, message: "Success" };
};

const findUser = (fileData, email) => {
  try {
    if (fileData?.find((user) => user.email === email)) {
      return fileData?.find((user) => user.email === email);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const uniqueUser = (userArray, email) => {
  try {
    console.log("dfghj");
    console.log(
      "uniqueUser",
      userArray?.filter((user) => user?.email === email)
    );
    if (userArray?.filter((user) => user?.email === email)?.length > 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
