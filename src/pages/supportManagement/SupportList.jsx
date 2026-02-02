import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { getSupportList, updateSupportStatus } from "../../api/authApi";

export default function AdminReportsList() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SUPPORT TICKETS ================= */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getSupportList();
        const formatted = res.data.map((item) => ({
          id: item.id,
          ticketNumber: item.ticket_number,
          question: item.subject,
          answer: item.description,
          status: item.status === "OPEN",
          priority: item.priority,
          created_at: item.created_at,
          userEmail: item.user_email,
          category: item.category,
          avatar: `https://ui-avatars.com/api/?name=Ticket+${item.ticket_number}&background=random`,
        }));

        setReports(formatted);
      } catch (error) {
        console.error("Failed to fetch support tickets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  /* ================= LOCAL STATUS CHANGE (UI ONLY) ================= */
  const handleStatusChange = async (id, isOpen) => {
    const newStatus = isOpen ? "OPEN" : "CLOSED";
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: isOpen } : r)),
    );
    try {
      await updateSupportStatus(id, newStatus);
    } catch (error) {
      console.error("Failed to update support ticket status", error);
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: !isOpen } : r,
        ),
      );
    }
  };
  return (
    <>
      <PageMeta title="Support | NZL Admin" />
      <PageBreadcrumb pageTitle="Support" />

      <div className="space-y-6">
        {loading && (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            Loading support tickets...
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            No support tickets found
          </div>
        )}

        {!loading &&
          reports.map((report) => (

            <div
              key={report.id}
              className="rounded-xl border bg-white p-6 hover:shadow-sm transition"
            >
              {/* TOP ROW */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-3 w-3 rounded-full ${report.status ? "bg-green-500" : "bg-yellow-400"
                      }`}
                  />

                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Ticket# {report.ticketNumber}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(report.created_at).toLocaleString()}
                </p>
              </div>

              {/* QUESTION */}
              <h3 className="mt-3 text-sm font-semibold text-gray-800">
                {report.question}
              </h3>

              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {report.answer}
              </p>

              {/* FOOTER */}
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                {/* LEFT: User + Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {/* Avatar (optional but subtle) */}
                  <img
                    src={report.avatar}
                    alt="User"
                    className="h-7 w-7 rounded-full object-cover opacity-90"
                  />

                  {/* User Email */}
                  <span className="font-medium text-gray-800">
                    {report.userEmail}
                  </span>

                  <span className="text-gray-300">•</span>

                  {/* Category */}
                  <span className="rounded-md border px-2 py-0.5 text-xs">
                    {report.category}
                  </span>

                  <span className="text-gray-300">•</span>

                  {/* Priority (text only) */}
                  <span
                    className={`text-xs font-medium ${report.priority === "HIGH"
                        ? "text-gray-900"
                        : "text-gray-500"
                      }`}
                  >
                    priority - {report.priority}
                  </span>
                </div>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-4">
                  <select
                    value={report.status ? "open" : "closed"}
                    onChange={(e) =>
                      handleStatusChange(report.id, e.target.value === "open")
                    }
                    className="rounded-md border px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => navigate(`/support/${report.id}`)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Open ticket →
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
