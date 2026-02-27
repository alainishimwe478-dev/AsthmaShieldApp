import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Patient {
  id: string;
  name: string;
  age: number;
  status: string;
  district: string;
  lastLog: string;
}

export const generateWeeklyReport = (patients: Patient[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AsthmaShield Weekly Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  autoTable(doc, {
    startY: 40,
    head: [["Name", "Age", "District", "Status", "Last Log"]],
    body: patients.map((p) => [
      p.name,
      p.age,
      p.district,
      p.status,
      p.lastLog,
    ]),
  });

  doc.save("Weekly_Report.pdf");
};

export const generateMonthlyReport = (patients: Patient[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AsthmaShield Monthly Health Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  autoTable(doc, {
    startY: 40,
    head: [["Name", "Age", "District", "Status", "Last Log"]],
    body: patients.map((p) => [
      p.name,
      p.age,
      p.district,
      p.status,
      p.lastLog,
    ]),
  });

  doc.save("Monthly_Report.pdf");
};
