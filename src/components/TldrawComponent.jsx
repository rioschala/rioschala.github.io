import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';


export default function TldrawComponent() {
  return (
    <div className='tldraw__editor' style={{ width: '100%', height: '1000px', margin: '0 auto', border: '2px solid #ddd', padding: '20px', boxSizing: 'border-box' }}>
      <Tldraw persistenceKey="example" options={{ maxPages: 1 }} />
    </div>
  );
}