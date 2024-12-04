import { Invoice } from '../../types/invoices';

interface InvoicePopupProps {
  invoice: Invoice;
  closePopup: () => void;
}

const InvoicesPopup: React.FC<InvoicePopupProps> = ({
  invoice,
  closePopup,
}) => {
  console.log(invoice);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg dark:bg-boxdark">
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(invoice.due_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Payee:</strong> {invoice.vendor_name}
        </p>
        <p>
          <strong>Description:</strong> {invoice.description}
        </p>
        <p>
          <strong>Due Date:</strong>{' '}
          {new Date(invoice.due_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Amount:</strong> $
          {Number.parseFloat(invoice.amount).toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {invoice.paid ? 'Paid' : 'Due'}
        </p>
        <button
          onClick={closePopup}
          className="mt-4 rounded-lg bg-primary py-2 px-4 text-white font-medium hover:bg-primary-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InvoicesPopup;
