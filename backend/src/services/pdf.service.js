/**
 * PDF Service
 * 
 * Generates PDF statements and documents using PDFKit.
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate Account Statement PDF
 */
export const generateAccountStatement = async (account, transactions, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `statement_${account.accountNumber}_${Date.now()}.pdf`;
      const filepath = path.join(__dirname, '../../temp', filename);

      // Ensure temp directory exists
      if (!fs.existsSync(path.dirname(filepath))) {
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
      }

      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).text('Account Statement', { align: 'center' });
      doc.moveDown();

      // Account Information
      doc.fontSize(14).text('Account Information', { underline: true });
      doc.fontSize(12);
      doc.text(`Account Number: ${account.accountNumber}`);
      doc.text(`Account Type: ${account.accountType}`);
      doc.text(`Balance: $${account.balance.toFixed(2)}`);
      doc.text(`Statement Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
      doc.moveDown();

      // Transactions Table Header
      doc.fontSize(14).text('Transactions', { underline: true });
      doc.moveDown();

      // Table headers
      const tableTop = doc.y;
      doc.fontSize(10);
      doc.text('Date', 50, tableTop);
      doc.text('Type', 150, tableTop);
      doc.text('Description', 250, tableTop);
      doc.text('Amount', 400, tableTop, { align: 'right' });
      doc.text('Balance', 480, tableTop, { align: 'right' });

      // Draw line under headers
      doc.moveTo(50, doc.y + 5).lineTo(550, doc.y + 5).stroke();
      doc.moveDown();

      // Transactions
      let yPos = doc.y;
      transactions.forEach((transaction) => {
        if (yPos > 700) {
          doc.addPage();
          yPos = 50;
        }

        doc.text(new Date(transaction.createdAt).toLocaleDateString(), 50, yPos);
        doc.text(transaction.transactionType, 150, yPos);
        doc.text(transaction.description || '-', 250, yPos, { width: 140 });
        doc.text(`$${transaction.amount.toFixed(2)}`, 400, yPos, { align: 'right' });
        doc.text(`$${transaction.balanceAfter.toFixed(2)}`, 480, yPos, { align: 'right' });
        yPos += 20;
      });

      // Footer
      doc.fontSize(10).text(
        `Generated on ${new Date().toLocaleString()}`,
        50,
        doc.page.height - 50,
        { align: 'center' }
      );

      doc.end();

      stream.on('finish', () => {
        resolve(filepath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

