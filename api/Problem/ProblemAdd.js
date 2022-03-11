import DB, { insertRows } from "../../db/db.controller.js";

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
  const inputs = testcase.map((item) => item.input.replaceAll("\\n", "\\\\n"));
  const outputs = testcase.map((item) => item.output.replaceAll("\\", "\\\\"));
  // \n => \\n \\n \\\\n
  const sql = `INSERT
INTO problem (title, level, type, description, requirement ,testcase, input_case, output_case)
VALUES (${JSON.stringify(title.replaceAll("\\n", ""))}, 
${level},  
${JSON.stringify(problemType)},
${JSON.stringify(description.replaceAll("\\", "\\\\"))},
'${JSON.stringify(requirement)}', 
'${JSON.stringify(testcase).replaceAll("\\", "\\\\")}', 
'${JSON.stringify(inputs).replaceAll("\\", "\\\\")}',   
'${JSON.stringify(outputs).replaceAll("\\", "\\\\")}')
`;
  // TODO BUG 문제에 같은 제목의 문제가 있는지 먼저 확인해야합니다.
  try {
    const result = await insertRows(sql);
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
