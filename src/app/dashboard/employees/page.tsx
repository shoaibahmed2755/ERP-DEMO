'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEmployees() {
      const { data, error } = await supabase.from('employees').select('*');
      if (error) {
        console.error('Error fetching employees:', error);
      } else if (data) {
        setEmployees(data);
      }
    }
    fetchEmployees();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) {
      alert('Error deleting employee: ' + error.message);
    } else {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.role}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => router.push(`/dashboard/employees/${emp.id}/edit`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
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
