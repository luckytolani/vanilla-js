import { login , signup , changePass , logout} from "../controllers/auth.controller.js";

const authRouter = (urlArray, body, method) => {
  switch (method) {
      case "POST": {
      if (urlArray[1] === "login") {

        if(!body?.email || !body?.pwd) return {status: false , message:"Password or Email is Missing"}   
        return login(body?.email , body?.pwd)

      } else if (urlArray[1] === "signup") {

        if(!body?.email || !body?.pwd) return {status: false , message:"Password or Email is Missing"}   
        return signup(body?.email , body?.pwd)

      } 
    };
    case "GET":{
        if (urlArray[1] === "logout") {
            return {status : true , message:'Success'}
        }
    };
    case "PATCH":{
        if (urlArray[1] === "changePass") {
            if(!body?.email || !body?.pwd || !body?.newPwd) return {status: false , message:"Password or Email is Missing or new Password is missing"}   
            return changePass(body?.email , body?.pwd , body?.newPwd)  
        }
    }
  }
};

export default authRouter;
