export interface ContentPart {
  text: string;
}

export interface ContentMessage {
  role: "user" | "model";
  parts: ContentPart[];
}

export interface GenerateContentConfig {
  systemInstruction?: string | { parts: ContentPart[] };
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GenerateContentParams {
  model: string;
  contents: string | ContentMessage[];
  config?: GenerateContentConfig;
}

export interface GenerateContentResponse {
  text: string;
  candidates?: Array<{
    content?: {
      parts?: ContentPart[];
      role?: string;
    };
  }>;
  raw?: unknown;
}

export class GoogleGenAI {
  apiKey: string;
  models: {
    generateContent: (
      params: GenerateContentParams
    ) => Promise<GenerateContentResponse>;
  };

  constructor(options?: { apiKey?: string }) {
    this.apiKey = options?.apiKey || process.env.GEMINI_API_KEY || "";
    this.models = {
      generateContent: async (
        params: GenerateContentParams
      ): Promise<GenerateContentResponse> => {
        if (!this.apiKey) {
          throw new Error("Missing GEMINI_API_KEY");
        }

        const model = params.model || "gemini-2.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
          model
        )}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

        const contents: ContentMessage[] = Array.isArray(params.contents)
          ? params.contents
          : [
              {
                role: "user",
                parts: [{ text: String(params.contents || "") }],
              },
            ];

        const body: Record<string, unknown> = {
          contents,
        };

        if (params.config) {
          if (params.config.systemInstruction) {
            body.systemInstruction =
              typeof params.config.systemInstruction === "string"
                ? {
                    parts: [{ text: params.config.systemInstruction }],
                  }
                : params.config.systemInstruction;
          }
          body.generationConfig = {
            temperature:
              params.config.temperature !== undefined
                ? params.config.temperature
                : 0.7,
            maxOutputTokens: params.config.maxOutputTokens || 1024,
          };
        }

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Gemini API Error (${res.status}): ${errText}`);
        }

        const data = (await res.json()) as {
          candidates?: Array<{
            content?: {
              parts?: ContentPart[];
              role?: string;
            };
          }>;
        };

        const text =
          data?.candidates?.[0]?.content?.parts
            ?.map((p) => p.text || "")
            .join("") || "";

        return {
          text,
          candidates: data?.candidates || [],
          raw: data,
        };
      },
    };
  }
}
