const { google } = require("googleapis");
require("dotenv").config();
const cron = require("node-cron");
const moment = require("moment");

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const updateVideo = async () => {
  console.log("sysdate ::==", moment());
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // YouTube client
  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // Get video
    const result = await youtube.videos.list({
      id: "ltG5ZuBZHt0",
      part: "statistics,snippet",
    });

    if (result.data.items.length > 0) {
      const stats = result.data.items[0].statistics;

      await youtube.videos.update({
        part: "snippet",
        requestBody: {
          id: "ltG5ZuBZHt0",
          snippet: {
            title: `This video has ${stats.viewCount} views, ${stats.likeCount} likes and ${stats.commentCount} comments.`,
            categoryId: 28,
          },
        },
      });
      console.log("executed");
    }
  } catch (error) {
    console.log(error);
  }
};

// const updateEvery8Mins = new CronJob("*/8 * * * * *", async () => {
//   // updateVideo();
//   console.log("run");
// });

// updateEvery8Mins.start();

cron.schedule("*/8 * * * *", function () {
  updateVideo();
  console.log("running a task every 8 minutes");
});
