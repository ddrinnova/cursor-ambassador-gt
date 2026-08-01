import { jsPDF } from 'jspdf';
import type { EventAgendaItem } from '@/lib/types';
import { coworkingDay } from '@/content/coworking-day';

type DownloadAgendaPdfOptions = {
	agenda: EventAgendaItem[];
	locale?: string;
};

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
	return doc.splitTextToSize(text, maxWidth) as string[];
}

export function downloadAgendaPdf({ agenda, locale = 'es' }: DownloadAgendaPdfOptions) {
	const doc = new jsPDF({ unit: 'mm', format: 'a4' });
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const marginX = 16;
	const contentWidth = pageWidth - marginX * 2;
	const isEs = locale !== 'en';

	const title = isEs ? coworkingDay.titleLocal : coworkingDay.title;
	const dateLabel = isEs ? coworkingDay.dateLabel.es : coworkingDay.dateLabel.en;
	const scheduleLabel = isEs ? 'Agenda del día' : 'Day agenda';
	const speakersLabel = isEs ? 'Charlas' : 'Talks';
	const registerLabel = isEs ? 'Regístrate' : 'Register';

	let y = 20;

	// Header
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(18);
	doc.setTextColor(20, 18, 11);
	doc.text(title, marginX, y);
	y += 8;

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(10);
	doc.setTextColor(90, 90, 90);
	doc.text('Cursor Guatemala · Coworking Day', marginX, y);
	y += 7;

	doc.setDrawColor(245, 78, 0);
	doc.setLineWidth(0.6);
	doc.line(marginX, y, marginX + 28, y);
	y += 8;

	doc.setTextColor(40, 40, 40);
	doc.setFontSize(10);
	doc.text(`${dateLabel}  ·  ${coworkingDay.timeLabel}`, marginX, y);
	y += 5;
	doc.text(coworkingDay.location, marginX, y);
	y += 5;
	doc.setTextColor(245, 78, 0);
	doc.text(`${registerLabel}: ${coworkingDay.lumaUrl.replace('https://', '')}`, marginX, y);
	y += 10;

	// Schedule
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(13);
	doc.setTextColor(20, 18, 11);
	doc.text(scheduleLabel, marginX, y);
	y += 7;

	doc.setDrawColor(220, 220, 220);
	doc.setLineWidth(0.2);

	for (const item of agenda) {
		const titleLines = wrapText(doc, item.title, contentWidth - 22);
		const meta = [item.speaker, item.description].filter(Boolean).join(' — ');
		const metaLines = meta ? wrapText(doc, meta, contentWidth - 22) : [];
		const blockHeight = 4 + titleLines.length * 4.2 + metaLines.length * 3.6 + 3;

		if (y + blockHeight > pageHeight - 18) {
			doc.addPage();
			y = 20;
		}

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(9);
		doc.setTextColor(245, 78, 0);
		doc.text(item.time, marginX, y + 3.5);

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(10);
		doc.setTextColor(20, 18, 11);
		doc.text(titleLines, marginX + 18, y + 3.5);
		y += 3.5 + titleLines.length * 4.2;

		if (metaLines.length > 0) {
			doc.setFont('helvetica', 'normal');
			doc.setFontSize(8.5);
			doc.setTextColor(100, 100, 100);
			doc.text(metaLines, marginX + 18, y);
			y += metaLines.length * 3.6;
		}

		y += 3;
		doc.setDrawColor(235, 235, 235);
		doc.line(marginX + 18, y, pageWidth - marginX, y);
		y += 4;
	}

	// Speakers summary
	if (y + 40 > pageHeight - 18) {
		doc.addPage();
		y = 20;
	}

	y += 4;
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(13);
	doc.setTextColor(20, 18, 11);
	doc.text(speakersLabel, marginX, y);
	y += 7;

	for (const speaker of coworkingDay.speakers) {
		const talkLines = wrapText(doc, `${speaker.time}  ${speaker.talk}`, contentWidth);
		const nameLine = `${speaker.name}${speaker.role ? ` · ${speaker.role}` : ''}`;
		const blockHeight = talkLines.length * 4.2 + 8;

		if (y + blockHeight > pageHeight - 18) {
			doc.addPage();
			y = 20;
		}

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(10);
		doc.setTextColor(20, 18, 11);
		doc.text(talkLines, marginX, y);
		y += talkLines.length * 4.2;

		doc.setFont('helvetica', 'normal');
		doc.setFontSize(8.5);
		doc.setTextColor(100, 100, 100);
		doc.text(nameLine, marginX, y);
		y += 7;
	}

	// Footer on last page
	doc.setFontSize(8);
	doc.setTextColor(140, 140, 140);
	doc.text('cursor.gt  ·  Cursor Community Guatemala', marginX, pageHeight - 10);

	doc.save('cursor-coworking-day-agenda.pdf');
}
