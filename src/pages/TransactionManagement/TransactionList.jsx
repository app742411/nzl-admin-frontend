import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TransactionListComp from "../../components/TransactionComponents/TransactionListComp";

export default function TransactionList() {
  return (
    <>
      <PageMeta title="Transactions | NZL Admin" />
      <PageBreadcrumb pageTitle="Transactions" />
      <TransactionListComp />
    </>
  );
}
