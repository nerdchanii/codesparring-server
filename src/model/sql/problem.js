/**
 * it will return sql and params for the following queries:
 *
 */
export default class Problem {
  constructor() { }

  getProblems = () => {
    return ['SELECT id, title, type, is_stable, not_stable, vote_count FROM problems'];
  };

  getProblem = ({ id }) => {
    return ['SELECT * FROM problems WHERE id = ?', [id]];
  };

  // testcase, input_case, outpu_case, requirement = json
  // requirement 는 택스트로 바꾸는게 좋을듯
  createProblem = (data) => {
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      data;
    const makeJson = (item) => JSON.stringify(item);
    return [
      'INSERT INTO problems \
      (title, type, level, test_input, test_output,input_case, output_case,  requirement, description) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        type,
        level,
        makeJson(test_input),
        makeJson(test_output),
        makeJson(input),
        makeJson(output),
        makeJson(requirement),
        description,
      ],
    ];
  };

  updateProblem = ({ id, data }) => {
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      data;

    const makeJson = (item) => JSON.stringify(item);
    return [
      'UPDATE problems SET title = ?, type = ?, level = ?, test_input = ?, test_output = ?, input_case = ?, output_case = ?, requirement = ?, description = ? WHERE id = ?',
      [
        title,
        type,
        level,
        makeJson(test_input),
        makeJson(test_output),
        makeJson(input),
        makeJson(output),
        makeJson(requirement),
        description,
        id,
      ],
    ];
  };

  getRandomProblem = () => {
    return ['SELECT * FROM problems ORDER BY RAND() LIMIT 1', []];
  }
}
