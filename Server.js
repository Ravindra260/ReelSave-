const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/download", async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "Instagram URL required"
        });
    }

    const validURL =
        /^https?:\/\/(www\.)?instagram\.com\/(reel|reels|p)\//i;

    if (!validURL.test(url)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Instagram URL"
        });
    }

    /*
      Yahan baad mein authorized/public-content
      media-processing service connect karenge.
    */

    res.json({
        success: true,
        message: "URL received successfully",
        url: url
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("ReelSave server running on port " + PORT);
});