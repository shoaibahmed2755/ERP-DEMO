'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';

export default function EditInventoryItemPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const { data, error } = await supabase
        .from('inventory')
        .select('name, quantity, category')
        .eq('id', id)
        .single();

      if (error || !data) {
        alert('Error loading item');
        router.push('/dashboard/inventory');
      } else {
        setName(data.name);
        setQuantity(data.quantity);
        setCategory(data.category);
        setLoading(false);
      }
    }

    if (id) fetchItem();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from('inventory')
      .update({ name, quantity, category })
      .eq('id', id);

    if (error) {
      alert('Error updating item: ' + error.message);
    } else {
      router.push('/dashboard/inventory');
    }
  }

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Inventory Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Item Name"
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
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
