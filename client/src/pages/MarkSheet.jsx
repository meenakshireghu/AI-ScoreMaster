// MarkSheet.jsx

import React, { useState } from 'react';
import ExportPDFButton from '../components/ExportPDFButton';

const MarkSheet = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Cy Ganderton',
      rollNo: '23',
      marks: '234',
      isChecked: true,
    },
    {
      id: 2,
      name: 'Hart Hagerty',
      rollNo: '23',
      marks: '123',
      isChecked: false,
    },
    {
      id: 3,
      name: 'Brice Swyre',
      rollNo: '23',
      marks: '432',
      isChecked: true,
    },
    // Add more data as needed
  ]);

  const handleCheckboxToggle = (id) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const exportToPDF = () => {
    // Logic for exporting data to PDF
    // You can implement this logic using a library like jsPDF
  };

  return (
    <>
      <main className="p-10 w-full">
        <div className="overflow-x-auto">
          <h3 className="font-bold text-2xl ml-10 mb-5">Mark Sheet</h3>
          <table className="table table-zebra">
            <thead>
              <tr className="text-center">
                <th>Serial Number</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Marks</th>
                <th>Checked</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr className="text-center" key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.rollNo}</td>
                  <td>{row.marks}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.isChecked}
                      onChange={() => handleCheckboxToggle(row.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <div className="flex justify-center mt-5">
        <ExportPDFButton data={data} />
      </div>
    </>
  );
};

export default MarkSheet;
