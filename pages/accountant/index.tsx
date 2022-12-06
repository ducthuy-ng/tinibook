import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../../styles/Accoutant.module.css';


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = checkRBACRedirect(ctx, Occupation.ACCOUNTANT);
  if (redirect) return redirect;

  const token = getToken(ctx);

  return {
    props: {
      token: token,
      query: ctx.query,
    },
  };
};

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Accountant(props: { token: TokenType; query: ParsedUrlQuery }) {
  const sidebarHook = useHeaderWithSidebarHook();

  const saleRecords = [
    { month: 1, totalSale: 100000 },
    { month: 2, totalSale: 200000 },
    { month: 3, totalSale: 100000 },
    { month: 4, totalSale: 200000 },
    { month: 5, totalSale: 100000 },
    { month: 6, totalSale: 200000 },
    { month: 7, totalSale: 100000 },
    { month: 8, totalSale: 200000 },
    { month: 9, totalSale: 100000 },
    { month: 10, totalSale: 200000 },
    { month: 11, totalSale: 100000 },
    { month: 12, totalSale: 200000 },
  ];

  const saleCategories = [
    { type: 'Trinh thám', amount: 1000 },
    { type: 'Văn học', amount: 50 },
    { type: 'Truyện cười', amount: 200 },
    { type: 'Nấu ăn', amount: 300 },
  ];

  return (
    <>
      <HeaderWithSidebar token={props.token} hook={sidebarHook} sidebar={AccountantSidebar} />
      <div className={styles.body}>
        <h1>Thống kê</h1>
        <div className={styles.chartRow}>
          <h2>Doanh thu theo thời gian</h2>
          <div className={styles.lineChartContainer}>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <LineChart data={saleRecords} margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray={'10 10'} />
                <XAxis dataKey={'month'} />
                <YAxis />
                <Line type={'monotone'} dataKey={'totalSale'} />
                <Tooltip labelFormatter={(label) => `Tháng ${label}`}
                         formatter={(value) => [`${value} (VND)`, 'Doanh thu']} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.chartRow}>
          <h2>Doanh thu theo thể loại</h2>
          <div className={styles.pieChartContainer}>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <PieChart>
                <Pie data={saleCategories} dataKey={'amount'} nameKey={'type'}>
                  {
                    saleCategories.map((entry, index) => <Cell key={index} fill={colors[index]} />)
                  }
                </Pie>
                <Tooltip />
                <Legend layout={'vertical'} align={'right'} verticalAlign={'middle'} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
