
import React, { useState } from 'react';
import { AuditLogEntry } from '../types';
import { CheckBadgeIcon, ExclamationTriangleIcon } from './icons';

interface AuditLogViewProps {
  log: AuditLogEntry[];
}

const AuditLogView: React.FC<AuditLogViewProps> = ({ log }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const getDecisionChip = (decision: string) => {
    switch(decision) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Denied': return 'bg-red-100 text-red-800';
        case 'Referred': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (log.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Audit & Fairness Log</h2>
        <p className="text-slate-500">No decisions have been logged yet. Please submit a loan application to see the log.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Audit & Fairness Log (AFL)</h2>
      <p className="text-slate-500 mb-6">This is an immutable, real-time log of all AI-driven decisions for regulatory and internal review.</p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Decision</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bias Check</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {log.map((entry, index) => (
              <React.Fragment key={entry.timestamp}>
                <tr className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{entry.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{entry.customerId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDecisionChip(entry.decision)}`}>
                        {entry.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {entry.biasCheckResult ? (
                      <span className="flex items-center text-green-600"><CheckBadgeIcon className="h-5 w-5 mr-1" /> Passed</span>
                    ) : (
                      <span className="flex items-center text-red-600"><ExclamationTriangleIcon className="h-5 w-5 mr-1" /> Failed</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <button onClick={() => setExpandedRow(expandedRow === index ? null : index)} className="text-blue-600 hover:text-blue-800">
                      {expandedRow === index ? 'Hide' : 'View'}
                     </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-blue-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">Input Parameters</h4>
                          <ul className="list-disc list-inside text-slate-600 space-y-1">
                            <li>Credit Score: <span className="font-medium">{entry.inputParameters.creditScore}</span></li>
                            <li>Income: <span className="font-medium">${entry.inputParameters.income.toLocaleString()}</span></li>
                            <li>DTI: <span className="font-medium">{entry.inputParameters.dti}%</span></li>
                            <li>Existing Products: <span className="font-medium">{entry.inputParameters.existingProducts}</span></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">AI Explanation Provided</h4>
                          <p className="text-slate-600 italic">"{entry.explanation}"</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogView;
