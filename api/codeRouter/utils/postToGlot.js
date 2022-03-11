import makeData from "./makeData.js";
import axios from "axios";

async function postToGlot(input, language, code) {
  const data = makeData(input, language, code);
  const response = await axios.post(
    `https://glot.io/api/run/${language}/latest`,
    data,
    {
      headers: {
        Authorization: "ec83be15-1d5f-4b05-953c-c8a268a3db71",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export default postToGlot;
