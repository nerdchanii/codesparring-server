import request from "request";
import makeData from "./utils/makeData.js";
import Status from "./utils/status.js";
import axios from "axios";
import trimErrMsg from "./utils/tirmError.js";
import STATUS from "./utils/status.js";

const runTestCode = async (req, res) => {
  console.log("runTestCode");
  // ex request
  /*
   * stdin : '1 2',
   * lang: 'javscript'
   * code: 'console.log(1+2)'
   * output: '3'
   * */
  const { stdin, lang, code, output } = req.body;
  const input = stdin === "" ? "" : stdin;

  const data = makeData(input, lang, code);
  try {
    const response = await axios.post(
      `https://glot.io/api/run/${lang}/latest`,
      data,
      {
        headers: {
          Authorization: "ec83be15-1d5f-4b05-953c-c8a268a3db71",
          "Content-Type": "application/json",
        },
      }
    );
    const { stdout, stderr } = response.data;
    if (stderr !== "") {
      const errMsg = trimErrMsg(stderr);
      return res.send({
        stdout,
        stderr: errMsg,
        status: STATUS.RUN_ERROR,
      });
    } else if (output.trim() === stdout.trim()) {
      res.send({
        stdout,
        stderr,
        status: STATUS.SUCCESS,
      });
    } else {
      res.send({
        stdout,
        stderr,
        status: STATUS.FAIL,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      stdout: "",
      stderr: "Error",
      status: "Error in occured",
    });
  }
};

export default runTestCode;
