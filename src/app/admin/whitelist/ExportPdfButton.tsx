"use client";

import { Button } from "@/components/ui/Button";

type Row = { address: string; created_at: string };

/**
 * Exports the current reservation list as a PDF.
 *
 * Builds a clean, standalone printable document in a popup window and triggers
 * the browser's print dialog — "Save as PDF" produces the file. This keeps the
 * export dependency-free: no server-side PDF toolchain, and the output is a
 * tidy table rather than a screenshot of the admin UI.
 */
export function ExportPdfButton({ rows }: { rows: Row[] }) {
  function exportPdf() {
    const win = window.open("", "_blank", "width=820,height=1040");
    if (!win) return;

    const generated = new Date().toLocaleString();
    const body = rows
      .map(
        (r, i) =>
          `<tr><td class="n">${rows.length - i}</td><td class="a">${escapeHtml(
            r.address,
          )}</td><td class="t">${escapeHtml(
            new Date(r.created_at).toLocaleString(),
          )}</td></tr>`,
      )
      .join("");

    win.document.write(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>SHAPESHIFTER — Whitelist Reservations</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #111; margin: 40px; }
  h1 { font-size: 20px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 4px; }
  .meta { font-size: 12px; color: #555; margin: 0 0 24px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #ddd; }
  th { text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; color: #555; border-bottom: 2px solid #111; }
  td.n { color: #888; width: 48px; }
  td.a { font-family: "SFMono-Regular", Menlo, Consolas, monospace; word-break: break-all; }
  td.t { white-space: nowrap; color: #333; }
  @media print { body { margin: 16mm; } }
</style>
</head>
<body>
  <h1>SHAPESHIFTER — Whitelist Reservations</h1>
  <p class="meta">${rows.length} wallet${rows.length === 1 ? "" : "s"} · generated ${escapeHtml(
    generated,
  )}</p>
  <table>
    <thead><tr><th>#</th><th>Wallet address</th><th>Reserved</th></tr></thead>
    <tbody>${body}</tbody>
  </table>
</body>
</html>`);
    win.document.close();
    win.focus();
    // Give the popup a tick to lay out before invoking print.
    win.setTimeout(() => win.print(), 250);
  }

  return (
    <Button size="sm" variant="ghost" onClick={exportPdf} disabled={rows.length === 0}>
      Export PDF
    </Button>
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
