'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AddEmployeePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from('employees').insert([{ name, email, role }]);
    if (error) {
      alert('Error adding employee: ' + error.message);
    } else {
      router.push('/dashboard/employees'); // redirect to list
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          required
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Employee
        </button>
      </form>
    </div>
  );
}
