import { notify } from "@/lib/notifications";

export async function exportToPDF(
  title: string,
  rows: Record<string, string | number>[]
) {
  try {
    notify.info("Generating PDF report...");

    // Динамически импортируем jsPDF только в браузере
    const { jsPDF } = await import("jspdf");

    const doc = new jsPDF();

    // Заголовок
    doc.setFontSize(22);
    doc.text(title, 20, 20);

    // Дата генерации
    doc.setFontSize(10);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      30
    );

    // Данные
    let y = 45;

    rows.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        doc.setFontSize(11);
        doc.text(`${key}: ${value}`, 20, y);
        y += 7;

        // Переход на новую страницу при необходимости
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      y += 5;
    });

    // Скачивание PDF
    const filename = title
      .toLowerCase()
      .replace(/\s+/g, "-");

    doc.save(`${filename}.pdf`);

    notify.success("PDF report generated successfully!");
  } catch (error) {
    console.error("PDF export error:", error);
    notify.error("Failed to generate PDF.");
  }
}