import type { NextPage } from 'next';
import { Layout } from '../../components/Layout/Layout.component';
import { Scanner } from '../../components/Scanner/Scanner.component';

const scan: NextPage = () => {
  return (
    <Layout>
      <Scanner />
    </Layout>
  );
};

export default scan;
