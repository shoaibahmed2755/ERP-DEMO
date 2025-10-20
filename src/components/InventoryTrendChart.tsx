'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type InventoryItem = {
  id: number
  name: string
  quantity: number
  category: string
}

export default function InventoryTrendChart() {
  const [data, setData] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true)
      const { data: items, error } = await supabase
        .from('inventory')
        .select('id, name, quantity, category')

      if (error) {
        console.error('Error fetching inventory:', error.message)
      } else {
        setData(items || [])
      }
      setLoading(false)
    }

    fetchInventory()
  }, [])

  if (loading) return <p>Loading chart...</p>
  if (data.length === 0) return <p>No inventory data available.</p>

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantity" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
