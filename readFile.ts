import fs from 'fs';
import OpenAI from 'openai';
import { ChatCompletionContentPart } from 'openai/resources/index';
import { OPEN_AI_API_KEY } from './strings';

/** 画像ファイルから情報を抽出する */
const readImgFile = async () => {
  const fileData = fs.readFileSync('bukken1.jpg', { encoding: 'base64' });
  if (fileData.length < 1) {
    console.log("ファイルが読み込めません");
    return;
  }

  const content: ChatCompletionContentPart[] = [
    { type: "text", text: "この画像から物件の面積・築年数を抽出してください。" },
    { type: "image_url", image_url: { url: `data:image/png;base64,${fileData}` } }
  ];

  const client = new OpenAI({ apiKey: OPEN_AI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content }]
  });

  console.log(completion.choices[0].message.content);
};

readImgFile();