import fs from 'fs';
import OpenAI from 'openai';
import { ChatCompletionContentPart } from 'openai/resources/index';
import { OPEN_AI_API_KEY } from './strings';

/** 画像ファイルから情報を抽出する */
const readImgFile = async () => {
  const fileData = fs.readFileSync('qiita_mypage.png', { encoding: 'base64' });
  if (fileData.length < 1) {
    console.log("ファイルが読み込めません");
    return;
  }

  const content: ChatCompletionContentPart[] = [
    { type: "text", text: "この画像から、ユーザー情報を抽出してください。" },
    { type: "image_url", image_url: { url: `data:image/png;base64,${fileData}` } }
  ];

  const client = new OpenAI({ apiKey: OPEN_AI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content }],

    // ↓ 戻り値の形式定義
    response_format: {
      type: "json_schema",
      json_schema: {
        strict: true,
        name: 'mypage_info',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'ユーザー名' },
            contributions: { type: 'number', description: '貢献数' },
            postCount: { type: 'number', description: '投稿回数' },
            followers: { type: 'number', description: 'フォロワー数' },
            following: { type: 'number', description: 'フォロー数' },
            introduction: { type: 'string', description: '自己紹介文' },
          },
          required: ['name', 'contributions', 'postCount', 'followers', 'following', 'introduction'],
          additionalProperties: false
        }
      }
    },
  });

  // API からの JSON形式のレスポンスを出力
  console.log(completion.choices[0].message.content);
};

readImgFile();