import { useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TransactionDetailComp from "../../components/TransactionComponents/TransactionDetailComp";

export default function TransactionDetail() {
  const { id } = useParams();

  return (
    <>
      <PageMeta title={`Transaction ${id} | NZL Admin`} />
      <PageBreadcrumb
        pageTitle="Transaction Details"
        links={[{ name: "Transactions", path: "/transactions" }, { name: id }]}
      />
      <TransactionDetailComp transactionId={id} />
    </>
  );
}
