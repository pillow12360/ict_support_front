import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 임시 데이터
const data = [
  { name: '대기 중', value: 400 },
  { name: '처리 중', value: 300 },
  { name: '완료', value: 300 },
];
const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* 통계 카드 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                총 민원 수
              </Typography>
              <Typography variant="h5" component="h2">
                1,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 더 많은 카드 추가 가능 */}

        {/* 차트 */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                민원 상태 분포
              </Typography>
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
            </CardContent>
          </Card>
        </Grid>

        {/* 더 많은 위젯/차트 추가 가능 */}
      </Grid>
    </Box>
  );
}

export default Dashboard;
