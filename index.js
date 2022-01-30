import GameList from "./api/game/GameList.js";
import express from "express";
import RankList from "./api/userRank/RankList.js";
import ProbelmList from "./api/Problem/ProblemList.js";
import ProblemItem from "./api/Problem/ProblemItem.js";
import NoticeList from "./api/notice/notice.js";
import UserAccount from "./api/UserAccount/UserAccount.js";
import getUserAccount from "./api/UserAccount/getUserAccount.js";

let app = express();

//Game
app.get("/api/game/list", GameList);

//Rank
app.get("/api/ranklist", RankList);

//Problem
app.get("/api/problem", ProbelmList);
app.get("/api/problem/:id", ProblemItem);

//Notice
app.get("/api/notice", NoticeList);

//TODO
//콜백함수는 언제가 getUserAccount로 대체되어야합니다.
app.get("/api/user", UserAccount);

app.listen(5000, () =>
  console.log("listen http://localhost:5000 happy hacking! ")
);
