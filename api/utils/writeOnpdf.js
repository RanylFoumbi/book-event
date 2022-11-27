const { PDFDocument, grayscale, StandardFonts } = require('pdf-lib');
const fs = require('fs');

const updateTicket = async(name) =>{
    const existingPdf = 'api/assets/pdf/pass_conference.pdf'
        console.log({existingPdf})
        const uint8Array = fs.readFileSync(existingPdf)
        // console.log({uint8Array})
        // Load a PDFDocument from the existing PDF uint8Array
        const pdfDoc = await PDFDocument.load(uint8Array)
        // console.log({pdfDoc})
        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    
        // Get the first page of the document
        const page = pdfDoc.getPage(0)
        // Get the width and height of the first page
        const { height } = page.getSize()

        // Draw a string of text diagonally across the first page
        page.moveTo(155, height - 14)
        page.setFont(helveticaFont)
        page.drawText(name, { color: grayscale(1), size: 16 })
        // console.log({page})
    
        // Serialize the PDFDocument to base64
        const pdfBase64 = await pdfDoc.saveAsBase64()

    return pdfBase64;
}

module.exports = updateTicket;