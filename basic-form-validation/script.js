let components = {
  form1: document.getElementById("form1"),
  form2: document.getElementById("form2"),
  form3: document.getElementById("form3"),
  previous1: document.getElementById("previous1"),
  previous2: document.getElementById("previous2"),
  next1: document.getElementById("next1"),
  next2: document.getElementById("next2"),
  progress: document.getElementById("progress"),
  fname: document.getElementById("fname"),
  lname: document.getElementById("lname"),
  phoneNo: document.getElementById("no"),
  date: document.getElementById("date"),
  fnameWarning: document.getElementById("fnameWarning"),
  lnameWarning: document.getElementById("lnameWarning"),
  phoneNoWarning: document.getElementById("phoneNoWarning"),
  dateWarning: document.getElementById("dateWarning"),
  step1: document.getElementById("s1"),
  step2: document.getElementById("s2"),
  step3: document.getElementById("s3"),
  submit: document.getElementById("submit"),
  container: document.getElementById("cont"),
  dp: document.getElementById("dp"),
  reset: document.getElementById("reset"),
  email: document.getElementById("email"),
  pwd: document.getElementById("pwd"),
  cPwd: document.getElementById("cPwd"),
  emailWarning: document.getElementById("emailWarning"),
  pwdWarning: document.getElementById("pwdWarning"),
  cPwdWarning: document.getElementById("cPwdWarning"),
};

let visitedForms = {
  form1: false,
  form2: false,
  form3: false,
};

let warnings = {
  fnameWarning: "Please fill First Name",
  lnameWarning: "Please fill Last Name",
  phoneNoWarning: "Please fill Phone No",
  dateWarning: "Please select Date",
  minimumLength: "Minimum Length should be",
  alphabets: "Only alphabets allowed in First Name",
  validPhoneNo: "Enter Valid Phone No",
  emailWarning: "Email is required",
  pwdWarning: "Password is required",
  cPwdWarning: "Confirm Password is required",
  validEmail: "Please Enter Valid email",
};

const signupScript = () => {
  let form1 = document.getElementById("form1");
  let form2 = document.getElementById("form2");
  let form3 = document.getElementById("form3");

  let previous1 = document.getElementById("previous1");
  let previous2 = document.getElementById("previous2");

  let next1 = document.getElementById("next1");
  let next2 = document.getElementById("next2");

  let progress = document.getElementById("progress");

  components.next1.onclick = () => {
    if (
      (components.fname.value === "" ||
        components.lname.value === "" ||
        components.phoneNo.value === "" ||
        components.date.value === "") 
    ) {
      components.fname.value === ""
        ? ((components.fnameWarning.style.display = "block"),
          (components.fnameWarning.innerText = warnings["fnameWarning"]))
        : null;
      components.lname.value === ""
        ? ((components.lnameWarning.style.display = "block"),
          (components.lnameWarning.innerText = warnings["lnameWarning"]))
        : null;
      components.phoneNo.value === ""
        ? ((components.phoneNoWarning.style.display = "block"),
          (components.phoneNoWarning.innerText = warnings["phoneNoWarning"]))
        : null;
      components.date.value === ""
        ? ((components.dateWarning.style.display = "block"),
          (components.dateWarning.innerText = warnings["dateWarning"]))
        : null;
    } else {
      initialState();
      if (checkValidInput()) {
        form1.style.left = "-450px";
        form2.style.left = "58px";
        progress.style.width = "66%";
        visitedForms.form1 = true;
      }
    }
  };
  next2.onclick = () => {
    form2.style.left = "-450px";
    form3.style.left = "58px";
    progress.style.width = "100%";
    visitedForms.form2 = true;
  };

  previous1.onclick = () => {
    form1.style.left = "58px";
    form2.style.left = "450px";
    progress.style.width = "33%";
  };

  previous2.onclick = () => {
    form2.style.left = "58px";
    form3.style.left = "450px";
    progress.style.width = "66%";
  };

  components.step1.onclick = () => {
    form1.style.left = "58px";
    form2.style.left = "450px";
    form3.style.left = "450px";
    progress.style.width = "33%";
  };

  components.step2.onclick = () => {
    if (visitedForms.form1) {
      form2.style.left = "58px";
      form1.style.left = "-450px";
      form3.style.left = "450px";
      progress.style.width = "66%";
    }
  };

  components.step3.onclick = () => {
    if (visitedForms.form2 && visitedForms.form1) {
      form3.style.left = "58px";
      form2.style.left = "-450px";
      form1.style.left = "-450px";
      progress.style.width = "100%";
    }
  };

  components.submit.onclick = () => {
    if (
      components.email.value === "" ||
      components.pwd.value === "" ||
      components.cPwd.value === ""
    ) {
      components.email.value === ""
        ? ((components.emailWarning.style.display = "block"),
          (components.emailWarning.innerText = warnings["emailWarning"]))
        : null;
      components.pwd.value === ""
        ? ((components.pwdWarning.style.display = "block"),
          (components.pwdWarning.innerText = warnings["pwdWarning"]))
        : null;
      components.cPwd.value === ""
        ? ((components.cPwdWarning.style.display = "block"),
          (components.cPwdWarning.innerText = warnings["cPwdWarning"]))
        : null;
    } else {
      initialState();

      visitedForms.form3 = true;
      if (checkValidInput()) {
        let obj = {};
        document.querySelectorAll("input").forEach((ele) => {
          obj[ele.name] = ele.value;
        });
        localStorage.setItem("formData", JSON.stringify(obj));
        progress.style.display = "none";
        components.container.style.display = "none";
        components.dp.style.display = "block";

        document.querySelectorAll("select").forEach((ele) => {
          obj[ele.name] = ele.value;
        });
      }

      components.reset.onclick = () => {
        window.location.reload();
        localStorage.clear();
      };
    }
  };

  const checkValidInput = () => {
    let flag = true;

    if (!/^[A-Za-z]+$/.test(components.fname.value)) {
      flag = false;
      components.fnameWarning.style.display = "block";
      components["fnameWarning"].innerText = warnings["alphabets"];
    } else if (components.fname.value.length < 3) {
      console.log("radhe");
      flag = false;
      components.fnameWarning.style.display = "block";
      components["fnameWarning"].innerText = warnings["minimumLength"] + 3;
    }

    if (!/^[A-Za-z]+$/.test(components.lname.value)) {
      flag = false;
      components.lnameWarning.style.display = "block";
      components["lnameWarning"].innerText = warnings["alphabets"];
    } else if (components.lname.value.length < 3) {
      flag = false;
      components.lnameWarning.style.display = "block";
      components["lnameWarning"].innerText = warnings["minimumLength"] + 3;
    }

    // let countryCodeRegex =
    //   /^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$/;
    // if (!countryCodeRegex.test(components.lname.value)) {
    //   flag = false;
    //   components.phoneNoWarning.style.display = "block";
    //   components.phoneNoWarning.innerText = warnings["valid"];
    // }

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(components.email.value) && visitedForms.form3) {
      flag = false;
      components.emailWarning.style.display = "block";
      components.emailWarning.innerText = warnings["validEmail"];
    }

    if (components.pwd.value !== components.cPwd.value && visitedForms.form3) {
      flag = false;
      components.cPwdWarning.innerText = "Password should Match";
      components.cPwdWarning.style.display = "block";
    }

    let validPwd =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!validPwd.test(components.pwd.value) && visitedForms.form3) {
      console.log(validPwd.test("Lucky@123"));
      flag = false;
      components.pwdWarning.innerText =
        "Password should contain atleast one capital alphabet one number , one special characters and minimum length 8 characters ";
      components.pwdWarning.style.display = "block";
    }

    return flag;
  };

  const initialState = () => {
    components.fname.value !== ""
      ? (components.fnameWarning.style.display = "none")
      : null;
    components.lname.value !== ""
      ? (components.lnameWarning.style.display = "none")
      : null;
    components.phoneNo.value !== ""
      ? (components.phoneNoWarning.style.display = "none")
      : null;
    components.date.value !== ""
      ? (components.dateWarning.style.display = "none")
      : null;
    components.email.value !== ""
      ? (components.emailWarning.style.display = "none")
      : null;
    components.pwd.value !== ""
      ? (components.pwdWarning.style.display = "none")
      : null;
    components.cPwd.value !== ""
      ? (components.cPwdWarning.style.display = "none")
      : null;
  };
};

signupScript();
