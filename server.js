const express = require("express");
const request = require("request");
const port = 3000;
const app = express();

const SEARCHURL = "https://api.spotify.com/v1/search";
const APIKEY =
  "YOUR API KEY";

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// router
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", (req, res) => {
  let query = req.body.query;
  request.get(
    {
      url: SEARCHURL,
      headers: {
        Authorization: `Bearer ${APIKEY}`,
      },
      qs: {
        q: query,
        type: "artist",
        market: "JP"
      },
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        let json = JSON.parse(body);
        res.render("result", { result: json.artists.items });
      }
    }
  );
});

// server listen on localhost:3000
app.listen(port, () => console.log(`Example app litening on port ${port}!`));
