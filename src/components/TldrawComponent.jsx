import React from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function TldrawComponent() {
  return (
    <div style={{ width: '100%', height: '500px', margin: '0 auto', border: '1px solid #ddd', padding: '20px', boxSizing: 'border-box' }}>
      <Tldraw persistenceKey="example" />
    </div>
  );
}