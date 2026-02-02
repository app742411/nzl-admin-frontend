import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../ui/table/index";

export default function DetailedReportsTable() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Detailed Reports</h3>

        <div className="flex gap-2">
          <button className="btn-danger">PDF</button>
          <button className="btn-success">CSV</button>
          <button className="btn-primary">Excel</button>
        </div>
      </div>

      {/* Table */}
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="border-b">
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Product
            </TableCell>
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Vendor
            </TableCell>
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Sales
            </TableCell>
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Revenue
            </TableCell>
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Tax/VAT
            </TableCell>
            <TableCell isHeader className="py-3 px-4 text-gray-500">
              Status
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="border-b">
            <TableCell className="py-3 px-4">iPhone 15 Pro</TableCell>
            <TableCell className="py-3 px-4">TechStore Pro</TableCell>
            <TableCell className="py-3 px-4">234</TableCell>
            <TableCell className="py-3 px-4">SAR23,400</TableCell>
            <TableCell className="py-3 px-4">SAR4,680</TableCell>
            <TableCell className="py-3 px-4">
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                Completed
              </span>
            </TableCell>
          </TableRow>

          <TableRow className="border-b">
            <TableCell className="py-3 px-4">Designer Handbag</TableCell>
            <TableCell className="py-3 px-4">Fashion Hub</TableCell>
            <TableCell className="py-3 px-4">156</TableCell>
            <TableCell className="py-3 px-4">SAR18,720</TableCell>
            <TableCell className="py-3 px-4">SAR3,744</TableCell>
            <TableCell className="py-3 px-4">
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                Completed
              </span>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-3 px-4">Smart TV 65"</TableCell>
            <TableCell className="py-3 px-4">Home Essentials</TableCell>
            <TableCell className="py-3 px-4">89</TableCell>
            <TableCell className="py-3 px-4">SAR12,460</TableCell>
            <TableCell className="py-3 px-4">SAR2,492</TableCell>
            <TableCell className="py-3 px-4">
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                Processing
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
