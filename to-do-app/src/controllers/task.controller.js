import fs from "fs";
import { idGen } from "../helpers/idGen.js";

export const createTask = (data) => {
  try {
    if (fs.existsSync("./db/task.json")) {
      const fileData = JSON.parse(fs.readFileSync("./db/task.json"));

      fileData.push({ ...data, id: idGen() });

      fs.writeFileSync("./db/task.json", JSON.stringify(fileData, null, 2));

      return { status: true, message: "success", data: data };
    } else {
      let task = [
        {
          ...data,
          id: idGen(),
        },
      ];
      fs.writeFile(
        "./db/task.json",
        JSON.stringify(task, null, 2),
        (err, data) => {
          console.log(err, data);
        }
      );
      return { status: true, message: "success", data: task };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something went wrong", error };
  }
};

export const getTask = (email) => {
  if (fs.existsSync("./db/task.json")) {
    const fileData = JSON.parse(fs.readFileSync("./db/task.json")) || [];

    console.log(global.loggedUser, 98789)

    return {
      status: true,
      message: "success",
      data: findTaskByUser(fileData, email),
    };
  } else {
    return { status: false, message: "File not exists" };
  }
};

export const updateTask = (obj) => {
  if (fs.existsSync("./db/task.json")) {
    const fileData = JSON.parse(fs.readFileSync("./db/task.json")) || [];

    fs.writeFileSync(
      "./db/task.json",
      JSON.stringify(updateTaskById(fileData, obj), null, 2)
    );

    return { status: true, message: "SuccessFully updated" };
  } else {
    return { status: false, message: "Something went wrong" };
  }
};

export const deleteTask = (taskId) => {
  if (fs.existsSync("./db/task.json")) {
    const fileData = JSON.parse(fs.readFileSync("./db/task.json")) || [];

    fs.writeFileSync(
      "./db/task.json",
      JSON.stringify(deleteByTaskId(fileData, taskId), null, 2)
    );

    return { status: true, message: "Task Deleted Successfully" };
  } else {
    return { status: false, message: "File doesn't exists" };
  }
};

const findTaskByUser = (fileData, email) => {
  try {
    return fileData?.filter((task) => task.user === email);
  } catch (error) {
    return []
  }
};

const updateTaskById = (fileData, data) => {
  try {
    return fileData?.map((ele) => {
      if (ele.id === data.id) {
        return { ...ele, ...data };
      }
      return ele;
    });
  } catch (error) {
    return [];
  }
};

const deleteByTaskId = (fileData, taskId) => {
  try {
    return fileData?.filter((task) => task.id !== taskId);
  } catch (error) {
    return [];
  }
};
