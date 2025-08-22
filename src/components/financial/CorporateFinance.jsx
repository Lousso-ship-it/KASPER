import React, { useState } from 'react';
import SectoralHeatmap from './SectoralHeatmap';
import CompanyFinanceTable from './CompanyFinanceTable';
import CompanyDetailView from './CompanyDetailView';

export default function CorporateFinance() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div className="space-y-8">
      <SectoralHeatmap />
      <CompanyFinanceTable onSelectCompany={setSelectedCompany} />
      {selectedCompany && (
        <CompanyDetailView
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}