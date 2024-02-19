import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: '대기 중', value: 400 },
  { name: '처리 중', value: 300 },
  { name: '완료', value: 300 },
];
const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];

function Dashboard() {
  return (
    <div>
      <div>
        <div>
          <div>
            <p>총 민원 수</p> {}
          </div>
        </div>
        <div>
          <div>
            <h2>민원 상태 분포</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
