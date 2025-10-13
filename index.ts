import { OpenAI } from "openai";

const API_KEY = "ここにAPIキーを貼り付けてください";

const run = async () => {
    const openai = new OpenAI({
        apiKey: API_KEY,
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "user", content: "2025年10月1日は何曜日ですか？" }
        ],
    });
    console.log(completion.choices[0].message);
}

// ここで実行
run();
