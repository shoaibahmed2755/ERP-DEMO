import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: '❌ API key not configured' }, { status: 500 });
    }

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    const model = 'models/gemini-2.5-flash-preview-09-2025'; // ✅ Use supported model

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return NextResponse.json({ error: `❌ Gemini API error: ${JSON.stringify(result.error)}` }, { status: 500 });
    }

    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response from Gemini.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '❌ Unexpected server error' }, { status: 500 });
  }
}
