import makeData from "./utils/makeData.js";
import STATUS from "./utils/status.js";
import axios from "axios";
import { readFile } from "fs/promises";
import postToGlot from "./utils/postToGlot.js";
import { getProblem } from "../../db/db.controller.js";

// get input, output from DB and return them as array
// async function getData(number) {
//   try {
//     const rows = getProblem(number);
//     const { input_case, output_case } = rows;
//     return { input_case, output_case };
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// }

async function runSubmitCode(req, res) {
  console.log("runSubmitCode");
  const { problemId, lang, code } = req.body;
  try {
    const [row] = await getProblem(problemId);
    const { input_case, output_case } = row;
    // 각각의 input을 전송하고 그 결과를 받아온다.
    const response = await Promise.all(
      input_case.map((stdin) => postToGlot(stdin, lang, code))
    );
    // 받아온 결과를 output과 비교한다.
    const result = response.map((eachRes, i) => {
      const { stdout, stderr } = eachRes;

      if (stderr !== "") {
        const errMsg = stderr;
        return {
          stdout,
          stderr: errMsg,
          status: STATUS.RUN_ERROR,
        };
      }
      if (stdout.trim() === output_case[i].trim()) {
        return {
          stdout,
          stderr,
          status: STATUS.SUCCESS,
        };
      } else {
        return {
          stdout,
          stderr,
          status: STATUS.FAIL,
        };
      }
    });
    res.send(result);
  } catch (err) {
    console.log("======code submit err ====");
    console.log(err);
    return res.status(500).json({
      err: {
        message: err.message,
        name: err.name,
      },
    });
  }
}

export default runSubmitCode;
