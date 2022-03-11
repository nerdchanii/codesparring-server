function trimErrMsg(err) {
  return err.split("\n").filter((line) => line.match(/Error/))[0];
}

export default trimErrMsg;
