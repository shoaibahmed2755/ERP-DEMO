'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AddInventoryItemPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from('inventory')
      .insert([{ name, quantity, category }]);
    if (error) {
      alert('Error adding item: ' + error.message);
    } else {
      router.push('/dashboard/inventory'); // redirect
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Inventory Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          required
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          required
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Item
        </button>
      </form>
    </div>
  );
}
