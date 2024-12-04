import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { fetchInvoices } from '../../features/Invoices/invoices.slice';
import { RootStateOrAny } from 'react-redux';
import { Invoice } from '../../types/invoices';
import InvoicesPopup from '../Popup/InvoicesPopup';

interface SelectedInvoice extends Invoice {}

const TableOne = () => {
  const [selectedInvoice, setSelectedInvoice] =
    useState<SelectedInvoice | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { invoices, loading } = useSelector((state: RootStateOrAny) => state);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleItemClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Payee
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Description
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Due Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {invoices?.map((invoice, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
              key === invoices?.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
            onClick={() => handleItemClick(invoice)}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {new Date(invoice.due_date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {invoice.vendor_name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{invoice.description}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {' '}
                {new Date(invoice.due_date).toLocaleDateString()}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                ${Number.parseFloat(invoice.amount).toFixed(2)}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{invoice.paid ? 'Paid' : 'Due'}</p>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && selectedInvoice && (
        <InvoicesPopup invoice={selectedInvoice} closePopup={closePopup} />
      )}
    </div>
  );
};

export default TableOne;
