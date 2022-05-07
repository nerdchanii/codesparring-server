import DB, { insertProblem } from "../../db/db.controller.js";

const RESULT = {
  SUCCESS: "success",
  FAIL: "FAIL",
};
const ERR_MSG = {
  DUPLICATE_TITLE: "DUPLICATE_TITLE",
};

export default async function ProblemAdd(req, res) {
  const stringData = JSON.stringify(req.body);
  const parsedData = JSON.parse(stringData);
  const { title, level, problemType, requirement, description, testcase } =
    parsedData;
  const inputs = testcase.map((item) => item.input);
  const outputs = testcase.map((item) => item.output);
  // \n => \\n \\n \\\\n

  const values = [
    title,
    level,
    problemType,
    JSON.stringify(description),
    JSON.stringify(requirement),
    JSON.stringify(testcase),
    JSON.stringify(inputs),
    JSON.stringify(outputs),
  ];

  // TODO BUG 문제에 같은 제목의 문제가 있는지 먼저 확인해야합니다.
  try {
    const result = await insertProblem(values);
    return result
      ? res.status(200).json({ result: RESULT.SUCCESS })
      : res.status(400).json({ result: RESULT.FAIL });
  } catch (e) {
    switch (e?.code) {
      case "ER_DUP_ENTRY":
        return res
          .status(400)
          .json({ result: RESULT.FAIL, message: ERR_MSG.DUPLICATE_TITLE });
      default:
        return res.status(500).json({ result: RESULT.FAIL });
    }
  }
}
