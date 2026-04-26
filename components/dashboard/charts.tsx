"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const weeklyData = [
  { day: "Mon", appointments: 24, revenue: 4200 },
  { day: "Tue", appointments: 32, revenue: 5600 },
  { day: "Wed", appointments: 28, revenue: 4900 },
  { day: "Thu", appointments: 35, revenue: 6100 },
  { day: "Fri", appointments: 42, revenue: 7350 },
  { day: "Sat", appointments: 18, revenue: 3150 },
  { day: "Sun", appointments: 8, revenue: 1400 },
]

const monthlyData = [
  { month: "Jan", patients: 180 },
  { month: "Feb", patients: 220 },
  { month: "Mar", patients: 195 },
  { month: "Apr", patients: 280 },
  { month: "May", patients: 310 },
  { month: "Jun", patients: 290 },
]

export function AppointmentChart() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Appointments</h3>
          <p className="text-sm text-muted-foreground">Appointment trends this week</p>
        </div>
        <select className="px-3 py-1.5 text-sm bg-secondary rounded-lg border-0 text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              itemStyle={{ color: '#2563EB' }}
            />
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#2563EB"
              strokeWidth={2.5}
              fill="url(#appointmentGradient)"
              dot={{ fill: '#2563EB', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: '#2563EB', strokeWidth: 3, stroke: '#FFFFFF' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function RevenueChart() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Daily revenue breakdown</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar 
              dataKey="revenue" 
              fill="#2563EB" 
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function PatientGrowthChart() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Patient Growth</h3>
          <p className="text-sm text-muted-foreground">Monthly new patients</p>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              itemStyle={{ color: '#7C3AED' }}
            />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ fill: '#7C3AED', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: '#7C3AED', strokeWidth: 3, stroke: '#FFFFFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
