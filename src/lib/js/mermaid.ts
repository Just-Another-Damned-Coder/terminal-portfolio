export function isMermaidLanguage(lang = "") {
    return lang.trim().toLowerCase() === "mermaid";
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function renderMermaidBlock(code: string) {
    return `<div class="mermaid-diagram" data-mermaid-pending="true"><pre class="mermaid-source">${escapeHtml(code)}</pre></div>`;
}

function createMermaidId() {
    return `mermaid-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
}

export async function renderMermaidDiagrams(root: ParentNode = document) {
    const diagrams = Array.from(
        root.querySelectorAll<HTMLElement>(".mermaid-diagram[data-mermaid-pending='true']")
    );

    if (!diagrams.length) return;

    const mermaid = (await import("mermaid")).default;
    mermaid.initialize({ startOnLoad: false, theme: "dark" });

    for (const diagram of diagrams) {
        diagram.removeAttribute("data-mermaid-pending");

        const source = diagram.querySelector(".mermaid-source")?.textContent ?? "";
        if (!source.trim()) continue;

        try {
            const { svg } = await mermaid.render(createMermaidId(), source);
            diagram.innerHTML = svg;
        } catch (error) {
            console.error("Mermaid rendering failed", error);
            diagram.classList.add("mermaid-error");
            diagram.insertAdjacentHTML("afterbegin", "<p>Error rendering diagram.</p>");
        }
    }
}
