import React, { Suspense, lazy } from 'react';
import 'tldraw/tldraw.css';

const TldrawLazy = lazy(() => import('./LazyTldraw'));

export default function TldrawComponent() {
  return (
    <div
      className='tldraw__editor'
      style={{
        width: '100%',
        height: '800px',
        margin: '0 auto',
        border: '2px solid #ddd',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <TldrawLazy persistenceKey="example" options={{ maxPages: 1 }} />
      </Suspense>
    </div>
  );
}