import { OpenAI } from "openai";
import { OPEN_AI_API_KEY } from "./strings";

const run = async () => {
    const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });
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
