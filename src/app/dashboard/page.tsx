'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import InventoryTrendChart from '@/components/InventoryTrendChart'  // <-- import chart

type InventoryItem = {
  id: number
  quantity: number
  // Add other columns if needed
}

type Employee = {
  id: number
  // Add other columns if needed
}

export default function DashboardPage() {
  const [counts, setCounts] = useState({ items: 0, lowStock: 0, employees: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data: items, error: itemsError } = await supabase
          .from<InventoryItem, InventoryItem>('inventory') // ✅ FIXED
          .select('id, quantity')
        if (itemsError) throw itemsError

        const { data: employees, error: employeesError } = await supabase
          .from<Employee, Employee>('employees') // ✅ FIXED
          .select('id')
        if (employeesError) throw employeesError

        const lowStock = items?.filter((i) => i.quantity < 10).length || 0

        setCounts({
          items: items?.length || 0,
          lowStock,
          employees: employees?.length || 0
        })
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  if (loading) return <p className="text-center text-gray-500">Loading dashboard data...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Items" value={counts.items} />
        <Card title="Low Stock Items" value={counts.lowStock} valueColor="text-red-600" />
        <Card title="Active Employees" value={counts.employees} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Inventory Trend</h2>
        <InventoryTrendChart />  {/* <-- Chart component here */}
      </div>
    </div>
  )
}

function Card({
  title,
  value,
  valueColor = 'text-gray-900'
}: {
  title: string
  value: number
  valueColor?: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  )
}
