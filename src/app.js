import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

const usersData = [];
const tweetsData = [];

function findAvatar(tweet) {
  const { avatar } = usersData.find((item) => item.username === tweet.username);
  return avatar;
}

server.get("/tweets", (req, res) => {
  const updatedTweets = tweetsData.map((tweet) => {
    const avatar = findAvatar(tweet);
    return {
      username: tweet.username,
      avatar: avatar,
      tweet: tweet.tweet,
    };
  });

  const tweetsCopy = [...updatedTweets].reverse();
  const fetchedTweets = tweetsCopy.slice(0, 10);

  res.send(fetchedTweets);
});

server.post("/sign-up", (req, res) => {
  const user = req.body;

  if (!user) {
    res.status(400).send("preencha todos os campos");
  } else {
    console.log("user", user);
    usersData.push(user);
    res.status(201).send("OK");
  }
});

server.post("/tweets", (req, res) => {
  const tweet = req.body;

  if (!usersData.find((user) => user.username === tweet.username)) {
    res.status(401).send("UNAUTHORIZED");
    return;
  }

  if (!tweet.tweet) {
    alert("escreva um tweet");
    return res.status(401).send("escreva um tweet");
  }

  tweetsData.push(tweet);

  res.status(201).send("OK");
});

server.listen(5000, () => {
  console.log("Servidor funfou de boas!!!");
});
