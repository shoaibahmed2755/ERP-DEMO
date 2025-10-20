'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
      if (error) {
        alert('Error loading employee');
        router.push('/dashboard/employees');
      } else {
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setLoading(false);
      }
    }
    if (id) fetchEmployee();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('employees')
      .update({ name, email, role })
      .eq('id', id);

    if (error) {
      alert('Error updating employee: ' + error.message);
    } else {
      router.push('/dashboard/employees');
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
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
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
