/**
 * Gera os assets usados pela requisição:
 *
 *  - public/visiodonto-logo.png      logo rasterizada, embutida no PDF gerado no navegador
 *  - public/requisicao-em-branco.pdf as duas páginas da requisição num arquivo só
 *
 * Rode com `npm run assets:pdf` sempre que visiodonto.svg ou requisicao*.jpeg mudarem.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { jsPDF } from "jspdf";

const publico = path.join(import.meta.dirname, "..", "public");

// ---------- logo ----------
// 54 mm de largura impressa a ~330 dpi. Achatada sobre o teal do cabeçalho:
// sem canal alfa o jsPDF embute bem menos bytes, e o fundo é sólido de qualquer forma.
const LARGURA_LOGO = 700;
const logo = await sharp(path.join(publico, "visiodonto.svg"))
  .resize({ width: LARGURA_LOGO })
  .flatten({ background: "#00798a" })
  .png({ palette: true, compressionLevel: 9 })
  .toBuffer();
await fs.writeFile(path.join(publico, "visiodonto-logo.png"), logo);
console.log(`visiodonto-logo.png — ${(logo.length / 1024).toFixed(0)} KB`);

// ---------- requisição em branco ----------
const A4 = { largura: 210, altura: 297 };
const doc = new jsPDF({ unit: "mm", format: "a4" });

const paginas = ["requisicao1.jpeg", "requisicao2.jpeg"];
for (const [i, arquivo] of paginas.entries()) {
  if (i > 0) doc.addPage();
  const caminho = path.join(publico, arquivo);
  const { width, height } = await sharp(caminho).metadata();
  const escala = Math.min(A4.largura / width, A4.altura / height);
  const l = width * escala;
  const a = height * escala;
  doc.addImage(
    await fs.readFile(caminho),
    "JPEG",
    (A4.largura - l) / 2,
    (A4.altura - a) / 2,
    l,
    a
  );
}

const pdf = Buffer.from(doc.output("arraybuffer"));
await fs.writeFile(path.join(publico, "requisicao-em-branco.pdf"), pdf);
console.log(
  `requisicao-em-branco.pdf — ${doc.getNumberOfPages()} páginas, ${(pdf.length / 1024).toFixed(0)} KB`
);
