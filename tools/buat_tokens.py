"""Membuat public/css/tokens.css dari design/tokens.json.

Website tidak butuh langkah build: public/css/tokens.css sudah ikut di repo.
Jalankan skrip ini hanya kalau design/tokens.json berubah:

    python3 tools/buat_tokens.py
"""
import json
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
TOKENS = json.loads((AKAR / "design" / "tokens.json").read_text(encoding="utf-8"))


def ratakan(obj, awalan=""):
    """{'primary': {'base': '#..'}} -> [('primary-base', '#..')]"""
    hasil = []
    for kunci, nilai in obj.items():
        if kunci.startswith("$") or kunci == "dark":
            continue
        nama = f"{awalan}-{kunci}" if awalan else kunci
        if isinstance(nilai, dict):
            hasil += ratakan(nilai, nama)
        else:
            hasil.append((nama, nilai))
    return hasil


def rem(px):
    return f"{px / 16:g}rem"


def baris_warna(warna, indent="  ", awalan="color"):
    return "\n".join(f"{indent}--{awalan}-{n}: {v};" for n, v in ratakan(warna))


def main():
    t = TOKENS
    bagian = ["/* Dibuat otomatis oleh tools/buat_tokens.py dari design/tokens.json. Jangan diedit langsung. */", ":root {"]
    bagian.append(baris_warna(t["color"]))
    # Salinan warna yang tidak ikut berganti tema, untuk bagian yang sengaja selalu terang atau
    # selalu gelap (panel merek di halaman Masuk, blok kode di mode gelap).
    bagian.append(baris_warna(t["color"], awalan="terang"))
    bagian.append(baris_warna(t["color"]["dark"], awalan="gelap"))

    fam = t["typography"]["family"]
    for n, v in fam.items():
        bagian.append(f"  --font-{n}: {v};")
    for n, v in t["typography"]["weight"].items():
        bagian.append(f"  --weight-{n}: {v};")
    for n, v in t["typography"]["lineHeight"].items():
        bagian.append(f"  --lh-{n}: {v};")
    # Ukuran huruf memakai rem supaya pilihan "Ukuran teks: Besar" ikut membesarkan semuanya.
    for n, v in t["typography"]["size"].items():
        bagian.append(f"  --fs-{n}: {rem(v['mobile'])};")
    for n, v in t["spacing"].items():
        bagian.append(f"  --space-{n}: {v}px;")
    for n, v in t["radius"].items():
        bagian.append(f"  --radius-{n}: {v}px;")
    for n, v in t["border"].items():
        bagian.append(f"  --border-{n}: {v}px;")
    for n, v in t["shadow"].items():
        bagian.append(f"  --shadow-{n}: {v};")
    for n, v in t["size"].items():
        nama = "".join("-" + c.lower() if c.isupper() else c for c in n)
        bagian.append(f"  --size-{nama}: {v}px;")
    lay = t["layout"]
    for n, v in lay["gutter"].items():
        bagian.append(f"  --gutter-{n}: {v}px;")
    bagian.append(f"  --content-max: {lay['contentMaxWidth']}px;")
    bagian.append(f"  --reading-max: {lay['readingMaxWidth']};")
    for n, v in t["motion"]["duration"].items():
        bagian.append(f"  --dur-{n}: {v}ms;")
    for n, v in t["motion"]["easing"].items():
        bagian.append(f"  --ease-{n}: {v};")
    bagian.append("  --focus-gap: var(--color-surface);")
    bagian.append("}")

    bagian.append(f"@media (min-width: {lay['breakpoint']['desktop']}px) {{\n  :root {{")
    for n, v in t["typography"]["size"].items():
        if v["mobile"] != v["desktop"]:
            bagian.append(f"    --fs-{n}: {rem(v['desktop'])};")
    bagian.append("  }\n}")

    gelap = baris_warna(t["color"]["dark"], "  ")
    gelap += "\n  --focus-gap: var(--color-background);"
    gelap += "\n  --shadow-raised: 0 1px 0 0 rgba(0, 0, 0, 0.4);"
    bagian.append(f':root[data-theme="dark"] {{\n{gelap}\n  color-scheme: dark;\n}}')
    gelap_media = gelap.replace("\n  ", "\n    ")
    bagian.append(
        f'@media (prefers-color-scheme: dark) {{\n  :root:not([data-theme="light"]) {{\n  {gelap_media}\n    color-scheme: dark;\n  }}\n}}'
    )
    (AKAR / "public" / "css" / "tokens.css").write_text("\n".join(bagian) + "\n", encoding="utf-8")
    print("public/css/tokens.css diperbarui")


if __name__ == "__main__":
    main()
