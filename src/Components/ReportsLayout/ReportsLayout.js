import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const reportsData = [
    {
      serialNumber: 1,
      doctorName: 'Dr. John Doe',
      doctorSpeciality: 'Cardiology',
      reportName: 'Cardiology-Report-John-Doe.pdf' // Custom download name
    },
    {
      serialNumber: 2,
      doctorName: 'Dr. Jane Smith',
      doctorSpeciality: 'Dermatology',
      reportName: 'Dermatology-Report-Jane-Smith.pdf' // Custom download name
    },
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.serialNumber}>
              <td>{report.serialNumber}</td>
              <td>{report.doctorName}</td>
              <td>{report.doctorSpeciality}</td>
              <td>
                {/* --- UPDATE THIS SECTION --- */}
                {/* Opens the PDF in a new tab */}
                <a href="/patient_report.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="report-button view-button">View Report</button>
                </a>
              </td>
              <td>
                {/* --- UPDATE THIS SECTION --- */}
                {/* The 'download' attribute tells the browser to download the file */}
                <a href="/patient_report.pdf" download={report.reportName}>
                  <button className="report-button download-button">Download Report</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;