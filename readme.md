# サンプル１

- 以下コマンド実行でリクエスト送信できる
```
npx ts-node index.ts
```

- そのまま実行した場合、レスポンスは以下の様になる
```
{
  role: 'assistant',
  content: '2025年10月1日は水曜日です。',
  refusal: null,
  annotations: []
}
```

# サンプル２

- 画像読み取りのプロンプト実行は、以下コマンドから実行できる

```
npx ts-node readFile.ts
```

- 戻り値は JSON 形式で出力する
