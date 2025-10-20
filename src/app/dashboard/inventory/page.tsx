'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from('inventory').select('*');
    if (error) {
      console.error('Error fetching inventory:', error);
    } else if (data) {
      setItems(data);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    const { error } = await supabase.from('inventory').delete().eq('id', id);
    if (error) {
      alert('Error deleting item: ' + error.message);
    } else {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => router.push(`/dashboard/inventory/${item.id}/edit`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
