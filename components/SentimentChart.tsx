
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Sentiment } from '../types';

interface SentimentChartProps {
  data: Sentiment;
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.positive },
    { name: 'Neutral', value: data.neutral },
    { name: 'Negative', value: data.negative },
  ].filter(item => item.value > 0);

  const COLORS = ['#10B981', '#6B7280', '#EF4444'];

  return (
    <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1F2937',
                        borderColor: '#4B5563',
                        color: '#D1D5DB'
                    }}
                />
                 <Legend iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
