# كتالوج المصرية الألمانية — WPC & PVC

مصدر رسمي محفوظ محليًا لاستخدامه كمرجع للمنتجات والألوان والمقاسات داخل EG-System.

## المصدر

- الموقع: [egerman-upvc.com](https://egerman-upvc.com)
- الملف الأصلي: كتالوج المصرية الألمانية لصناعة منتجات WPC-PVC (فبراير 2025)
- PDF: Illustrator → PDF 1.4 · **26 صفحة** · ~3.4 MB

## المحتويات المحفوظة

| Path | الوصف |
|------|--------|
| `egerman-wpc-pvc-catalog.pdf` | الملف الأصلي كما نُزّل |
| `egerman-wpc-pvc-catalog.txt` | نص مجمّع لكل الصفحات عبر OCR |
| `pages/images/page-XX.png` | صور الصفحات (150 DPI) |
| `pages/ocr/page-XX.txt` | OCR لكل صفحة على حدة |

## ملاحظات الاستخراج

- الـPDF **بدون طبقة نص** (تصميم رسومي)، لذلك `pdftotext` لم يُخرج محتوى مفيدًا.
- تم التحويل بـ `pdftoppm` ثم OCR بـ Tesseract (`ara+eng`).
- جودة الـOCR متوسطة على الصفحات ذات التصميم الكثيف؛ الرجوع لصور الصفحات أو الـPDF هو المرجع البصري الأدق.

## إعادة الاستخراج

```bash
cd docs/reference/catalog
pdftoppm -png -r 150 egerman-wpc-pvc-catalog.pdf pages/images/page
for img in pages/images/page-*.png; do
  tesseract "$img" "pages/ocr/$(basename "$img" .png)" -l ara+eng --psm 6
done
```
