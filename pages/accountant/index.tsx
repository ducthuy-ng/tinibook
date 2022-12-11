import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import { CartesianGrid, Line, LineChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../styles/Accoutant.module.css';
import { SaleRecord } from '../api/finance/statistic/revenue';
import useSWR from 'swr';
import { fetcher } from '../../lib/swr';
import { CategorySale } from '../api/finance/statistic/category';

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

export default function Accountant(props: { token: TokenType; query: ParsedUrlQuery }) {
  const sidebarHook = useHeaderWithSidebarHook();

  return (
    <>
      <HeaderWithSidebar className={styles.header} token={props.token} hook={sidebarHook} sidebar={AccountantSidebar} />
      <div className={styles.body}>
        <h1>Thống kê</h1>
        <div className={styles.chartRow}>
          <h2>Doanh thu theo thời gian</h2>
          <div className={styles.lineChartContainer}>
            <RevenueChart />
          </div>
        </div>
        <div className={styles.chartRow}>
          <h2>Doanh thu theo thể loại</h2>
          <div className={styles.pieChartContainer}>
            <CategorySaleChart />
          </div>
        </div>
      </div>
    </>
  );
}

function RevenueChart() {
  const { data, error } = useSWR<SaleRecord[]>(`/api/finance/statistic/revenue?year=2022`, fetcher);

  if (error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!data) return <div>Đang tải</div>;
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={data} margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray={'10 10'} />
        <XAxis dataKey={'month'} />
        <YAxis />
        <Line type={'monotone'} dataKey={'totalSale'} />
        <Tooltip labelFormatter={(label) => `Tháng ${label}`} formatter={(value) => [`${value} (VND)`, 'Doanh thu']} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CategorySaleChart() {
  const { data, error } = useSWR<CategorySale[]>(`/api/finance/statistic/category?year=2022&month=10`, fetcher);

  if (error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!data) return <div>Đang tải</div>;

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis dataKey={'book_type'} />
        <Bar dataKey={'quantity'} />
        <Tooltip formatter={(value) => [`${value}`, 'Số lượng']} />
      </BarChart>
    </ResponsiveContainer>
  );
}
