import type { NextPage } from 'next';
import { Layout } from '../../components/Layout/Layout.component';
import { ScannerResponse } from '../../components/ScannerResponse/ScannerResponse.component';

const response: NextPage = () => {
  return (
    <Layout>
      <ScannerResponse />
    </Layout>
  );
};

export default response;
