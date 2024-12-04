import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import InvoicesList from '../components/Tables/InvoicesList';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <InvoicesList />
      </div>
    </>
  );
};

export default Tables;
