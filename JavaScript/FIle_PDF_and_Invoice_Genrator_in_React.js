import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from 'file-saver';
import fs from "fs/promises"; // Use Node.js to read/write files


async function createInvoicePdf(formData) {
  try {
    // Extract invoice data
    const { totalPayment, discount, paymentReceived, remainingPayment } =
      formData;
    const netPayment = totalPayment - discount;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]); // A6 page size

    // Load fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Define colors and font sizes
    const black = rgb(0, 0, 0);
    const headerFontSize = 16;
    const fieldFontSize = 12;
    const lineSpacing = 20;

    let yPosition = 550; // Start at the top of the page

    // Add Header
    const pageWidth = 400; // Width of the page (example: A6 size, 400 points)

    // Draw "IQRA Driving School"
    const text1 = "IQRA Driving School";
    const text1Width = boldFont.widthOfTextAtSize(text1, headerFontSize);
    page.drawText(text1, {
      x: (pageWidth - text1Width) / 2, // Center align
      y: yPosition,
      size: headerFontSize,
      font: boldFont,
      color: black,
    });
    yPosition -= lineSpacing;

    // Draw "INVOICE"
    const text2 = "INVOICE";
    const text2Width = boldFont.widthOfTextAtSize(text2, headerFontSize);
    page.drawText(text2, {
      x: (pageWidth - text2Width) / 2, // Center align
      y: yPosition,
      size: headerFontSize,
      font: boldFont,
      color: black,
    });
    yPosition -= lineSpacing * 2;

    // Add Invoice Fields
    const fields = [
      { label: "Reference ID", value: "INV123456" },
      { label: "Total Payment (Without Discount)", value: totalPayment.toString() },
      { label: "Discount", value: discount.toString() },
      { label: "Net Payment (With Discount)", value: netPayment.toString() },
      { label: "Payment Received", value: paymentReceived.toString() },
      { label: "Payment Remaining", value: remainingPayment.toString() },
    ];

    // Draw fields with bold labels
    fields.forEach(({ label, value }) => {
      // Draw Label (Bold)
      page.drawText(`${label}:`, {
        x: 50,
        y: yPosition,
        size: fieldFontSize,
        font: boldFont, // Use bold font for label
        color: black,
      });

      // Draw Value (Regular)
      page.drawText(value, {
        x: 200, // Align value next to the label
        y: yPosition,
        size: fieldFontSize,
        font: regularFont, // Use regular font for value
        color: black,
      });

      yPosition -= lineSpacing; // Move to the next line
    });

    // Add Footer
    page.drawText("Thank you for your payment!", {
      x: (pageWidth - text2Width) / 2,
      y: 50, // Footer position
      size: fieldFontSize,
      font: regularFont,
      color: black,
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'Invoice.pdf');

    console.log("Invoice PDF created successfully!");
  } catch (error) {
    console.error("Error creating invoice PDF:", error);
  }
}

async function fillPdf() {
  // Load the existing PDF file
  const existingPdfBytes = await fs.readFile("Admission Form 2.pdf");

  // Load the PDFDocument
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page of the PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const father = "John Doe";
  const name = "John Doe";
  const birthdate = "17-04-2000";
  const cnic = "12345-6789012-3";
  const phoneNumber = "0367-3215679";
  const cellNumber = "0367-3215679";
  const education = "BS CS";
  const address = "7A 123 street Lahore.";
  const Fee = "10000";
  const time = "9:07";
  const startDate = "01-01-2004";
  const Date = "24-12-2024";

  // Define the data and positions
  const data = {
    "D/o,W/o,S/o": { x: 110, y: 604, value: father },
    "Name": { x: 395, y: 603, value: name },
    "DOB": { x: 380, y: 568, value: birthdate },
    "CNIC": { x: 95, y: 568, value: cnic },
    "Ph#": { x: 55, y: 536, value: phoneNumber },
    "Cell": { x: 217, y: 534, value: cellNumber },
    "Education": { x: 440, y: 534, value: education },
    "Address": { x: 90, y: 507, value: address },
    "Fee": { x: 55, y: 476, value: Fee },
    "Time": { x: 150, y: 476, value: time },
    "S.Date": { x: 305, y: 476, value: startDate },
    "Date": { x: 460, y: 476, value: Date },
    "Ref":{ x: 75, y:643, value: "Ref" }
  };

  // Add text to the appropriate fields
  for (const [field, { x, y, value }] of Object.entries(data)) {
    firstPage.drawText(value, {
      x,
      y,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  // Save the updated PDF
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile("changes_made.pdf", pdfBytes);

  console.log("PDF filled and saved as 'Filled Admission Form.pdf'");
}

// Example usage
const formData = {
  totalPayment: 500,
  discount: 50,
  paymentReceived: 300,
  remainingPayment: 150,
};

createInvoicePdf(formData);
fillPdf();












