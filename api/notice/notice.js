import DB, { getRows } from "../../db/db.controller.js";

async function NoticeList(req, res) {
  const sql =
    "SELECT notice_id as id, notice_title as title, notice_label as label, notice_body as body, notice_writer as writer FROM notice";
  const rows = await getRows(sql);
  return res.send(rows);
}

export default NoticeList;
