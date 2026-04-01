const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: "Missing GEMINI_API_KEY. Configure the server environment before using AI explanations.",
        });
    }

    const prompt = req.body?.prompt;

    if (typeof prompt !== "string" || !prompt.trim()) {
        return res.status(400).json({ error: "A non-empty prompt is required." });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 512,
                        topP: 0.95,
                        topK: 40,
                    },
                }),
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    "Gemini API request failed.",
            });
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(502).json({
                error: "Gemini returned an empty response.",
            });
        }

        return res.status(200).json({ text });
    } catch (error) {
        return res.status(500).json({
            error: "Server error",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
