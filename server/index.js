const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { ApifyClient } = require("apify-client")
const pool = require("./db");
dotenv.config();
const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api",(req ,res)=>{
    res.status(200).json({
        success: true,
        message: "Fashion Api is running"
    })
})

// Router for recieving users search query
app.get("/api/search", async (req, res) => {
    try {
        const query = req.query.q?.trim();

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const hashtag = query
            .replace(/\s+/g, "")
            .toLowerCase();

        // 1. Check PostgreSQL first
        const existingResults = await pool.query(
            `SELECT *
             FROM fashion_trends
             WHERE hashtag = $1
             ORDER BY timestamp DESC`,
            [hashtag]
        );

        // 2. If data already exists, return it
        if (existingResults.rows.length > 0) {
            return res.status(200).json({
                success: true,
                source: "database",
                query: query,
                hashtag: hashtag,
                count: existingResults.rows.length,
                data: existingResults.rows
            });
        }

        // 3. If data doesn't exist, call Apify
        const input = {
            hashtag: hashtag,
            maxPosts: 10
        };

        const run = await apifyClient
            .actor(process.env.APIFY_ACTOR_ID)
            .call(input);

        // 4. Get the Apify results
        const { items } = await apifyClient
            .dataset(run.defaultDatasetId)
            .listItems();

        // 5. Save the new results to PostgreSQL
        for (const item of items) {
            await pool.query(
                `INSERT INTO fashion_trends
                (
                    id,
                    hashtag,
                    image_url,
                    caption,
                    creator_handle,
                    likes,
                    comments,
                    engagement_score,
                    source_url,
                    timestamp
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id) DO UPDATE SET
                    hashtag = EXCLUDED.hashtag,
                    image_url = EXCLUDED.image_url,
                    caption = EXCLUDED.caption,
                    creator_handle = EXCLUDED.creator_handle,
                    likes = EXCLUDED.likes,
                    comments = EXCLUDED.comments,
                    engagement_score = EXCLUDED.engagement_score,
                    source_url = EXCLUDED.source_url,
                    timestamp = EXCLUDED.timestamp`,
                [
                    item.id,
                    item.hashtag,
                    item.imageUrl,
                    item.caption,
                    item.creatorHandle,
                    item.likes,
                    item.comments,
                    item.engagementScore,
                    item.sourceUrl,
                    item.timestamp
                ]
            );
        }

        // 6. Return the newly fetched results
        res.status(200).json({
            success: true,
            source: "apify",
            query: query,
            hashtag: hashtag,
            count: items.length,
            data: items
        });

    } catch (error) {
        console.error("Search error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch fashion trends"
        });
    }
});

app.get("/api/trends", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM fashion_trends
             ORDER BY timestamp DESC`
        );

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch fashion trends"
        });
    }
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})