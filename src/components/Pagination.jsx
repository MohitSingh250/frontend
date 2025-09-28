import React from 'react';

export default function Pagination({ page, setPage, hasMore }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 border rounded">Prev</button>
      <span>Page {page}</span>
      <button onClick={() => setPage(p => p+1)} disabled={!hasMore} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
