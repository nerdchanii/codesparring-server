import express from "express";
import {
  GameList,
  GameMake,
  GameJoin,
  GameLeave,
  GameRoomRenew,
} from "./game/Game.controller.js";
import RankList from "./userRank/RankList.js";
import ProbelmList from "./Problem/ProblemList.js";
import ProblemItem from "./Problem/ProblemItem.js";
import NoticeList from "./notice/notice.js";
import UserAccount from "./UserAccount/UserAccount.js";
import getUserAccount from "./UserAccount/getUserAccount.js";
import deleteUser from "./UserAccount/deleteUser.js";
import runTestCode from "./codeRouter/runTestCode.js";
import runSubmitCode from "./codeRouter/runSubmitCode.js";
import ProblemAdd from "./Problem/ProblemAdd.js";
import { generateAccessToken } from "../middleware/jwt/jwt.js";
import login from "./login/login.js";
import fakelogin from "./login/fakelogin.js";

const apiRouter = express.Router();

//Game
//이건 방식이 바뀌어야한다. 바보야
// get /game
// post /game
// get /game/:id
// pos /game/:id




apiRouter.get("/game/list", GameList);
apiRouter.post("/game/make", GameMake);
apiRouter.post("/game/join/:id", GameJoin);
apiRouter.post("/game/leave/:id", GameLeave);
apiRouter.get("/game/renew/:roomId", GameRoomRenew);
//Problem
apiRouter.post("/Problem/add", ProblemAdd);
apiRouter.get("/problem", ProbelmList);
apiRouter.get("/problem/:id", ProblemItem);
// post problem
// get problem
// get problem/:id

//Notice
apiRouter.get("/notice", NoticeList);

//TODO JWT 받아서 해야하는 것
//콜백함수는 언제가 getUserAccount로 대체되어야합니다.
apiRouter.get("/user/profile", getUserAccount);
apiRouter.delete("/delete/user", deleteUser);

// get /user/:name
// put /user/:name
// delete /user


// post /code/test
// post /code/submit



apiRouter.post("/code/test", runTestCode);
apiRouter.post("/code/submit", runSubmitCode);

//user
// get /users/rank
// post /users/login
apiRouter.get("/user/rank", RankList);
apiRouter.post("/user/login", login);
apiRouter.post("/user/fake/login", fakelogin);

export default apiRouter;
