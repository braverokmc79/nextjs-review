export async function translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const res = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLanguage,
          format: "text"
        }),
        signal: AbortSignal.timeout(5000) // optional: Node 18+ or with `undici`
      });
  
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const data = await res.json();
      return data.translatedText;
    } catch (err) {
      console.error("🔴 번역 오류:", err);
      return text; // fallback: 원문 그대로 반환
    }
}

  