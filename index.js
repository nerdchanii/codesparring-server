import GameList from "./api/game/GameList.js";
import express from "express";
import RankList from "./api/userRank/RankList.js";

let app = express();

app.get("/api/game/list", GameList);
app.get("/api/ranklist", RankList);

app.listen(5000, () => console.log("쥬아쥬아"));
