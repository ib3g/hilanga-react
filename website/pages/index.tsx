import type { NextPage } from 'next';
import { Layout } from '../components/Layout/Layout.component';
import { HomeScanContainer } from '../components/HomeScanContainer/HomeScanContainer.component';

const Home: NextPage = () => {
  return (
    <Layout>
      <HomeScanContainer />
    </Layout>
  );
};

export default Home;
