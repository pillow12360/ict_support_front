import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { collection, getDocs, query } from 'firebase/firestore';
import db from '../../firebase';

const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];

function Dashboard() {
  const [complaintStatus, setComplaintStatus] = useState([]);

  useEffect(() => {
    const STATUS_LABELS = {
      accepting: '접수 중',
      received: '접수 완료',
      not_accepted: '접수 불가',
      in_progress: '처리 중',
      completed: '완료',
      unresolvable: '처리 불가',
    };

    const fetchComplaintData = async () => {
      const complaintQuery = query(collection(db, 'complaints'));
      const querySnapshot = await getDocs(complaintQuery);
      const status = {
        accepting: 0,
        received: 0,
        not_accepted: 0,
        in_progress: 0,
        completed: 0,
        unresolvable: 0,
      };

      querySnapshot.forEach((doc) => {
        // 여기서는 `status` 필드를 기반으로 민원 상태를 집계합니다.
        const complaint = doc.data();
        if (complaint.status) {
          status[complaint.status] += 1;
        }
      });

      // `status` 객체를 배열로 변환하여 차트 데이터로 사용합니다.
      const chartData = Object.keys(status)
        .map((key) => ({
          name: STATUS_LABELS[key], // 영문 상태를 한글로 변환
          value: status[key],
        }))
        .filter((entry) => entry.value > 0); // 값이 0보다 큰 항목만 필터링

      setComplaintStatus(chartData);
    };

    fetchComplaintData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <div>
            <h2>민원 처리 상태</h2>
            <p>
              총 민원 수 :{' '}
              {complaintStatus.reduce((acc, curr) => acc + curr.value, 0)}
            </p>

            <p>접수 중 : {complaintStatus[0]?.value || 0}</p>
            <p>접수 불가 : {complaintStatus[1]?.value || 0}</p>
            <p>처리 중 : {complaintStatus[2]?.value || 0}</p>
            <p>완료 : {complaintStatus[3]?.value || 0}</p>
            <p>처리 불가 : {complaintStatus[4]?.value || 0}</p>
          </div>
        </div>
        <div>
          <div>
            <h2>민원 상태 분포</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complaintStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {complaintStatus.map((entry, index) => (
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
