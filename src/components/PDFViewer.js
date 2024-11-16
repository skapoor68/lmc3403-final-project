import React from 'react';

const PDFViewer = ({ pdfUrl, className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <object
        data={pdfUrl}
        type="application/pdf"
        className="w-full h-full"
      >
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-600">
          <p className="mb-2">Unable to display PDF file.</p>
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Open PDF in new tab
          </a>
        </div>
      </object>
    </div>
  );
};

export default PDFViewer;