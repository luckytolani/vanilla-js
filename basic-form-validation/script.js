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
      if (checkValidInput() ) {
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

  let countryCodeRegex =
    /^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$/;
  if (countryCodeRegex.test(components.lname.value)) {
    flag = false;
    components.phoneNoWarning.style.display = "block";
    components.phoneNoWarning.innerText = warnings["phoneNoWarning"];
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
};

signupScript();
