import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const generateReceipt = async ({
    templatePath = "template.pdf",
    outputFolder = "receipts",
    name,
    mode,
    cause,
    amount,
    billNo,
    date
}) => {
    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    page.drawText(`${billNo}`, {
        x: 470,
        y: 702,
        size: 12,
        font,
    });

    page.drawText(name, {
        x: 100,
        y: 660,
        size: 12,
        font,
    });


    page.drawText(date, {
        x: 110,
        y: 615,
        size: 12,
        font,
    });


    page.drawText(mode, {
        x: 471,
        y: 616,
        size: 12,
        font,
    });

    page.drawText(cause, {
        x: 200,
        y: 570,
        size: 12,
        font,
    });

    page.drawText(`Rs. ${amount}`, {
        x: 450,
        y: 570,
        size: 12,
        font,
    });

    page.drawText(`Rs. ${amount}`, {
        x: 450,
        y: 550,
        size: 12,
        font,
    });

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    const filePath = path.join(outputFolder, `${billNo}.pdf`);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);

    return filePath;
};