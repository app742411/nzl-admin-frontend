import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import toast from "react-hot-toast";
import {
  getSupportTicketById,
  replySupportTicket,
  updateSupportStatus,
} from "../../api/authApi";

export default function AdminReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const messagesEndRef = useRef(null);

  // Function to format date like WhatsApp
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: diffDays > 365 ? 'numeric' : undefined
      });
    }
  };

  // Function to format time
  const isClosed = status === "CLOSED";
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    if (!messages) return [];
    
    const groups = {};
    const sortedMessages = [...messages].sort((a, b) => 
      new Date(a.created_at) - new Date(b.created_at)
    );

    sortedMessages.forEach(message => {
      const dateKey = new Date(message.created_at).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: message.created_at,
          messages: []
        };
      }
      groups[dateKey].messages.push(message);
    });

    return Object.values(groups);
  };

  /* ================= FETCH TICKET ================= */
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await getSupportTicketById(id);
        setTicket(res.data);
        setStatus(res.data.status);
        setType(res.data.subject);
      } catch (error) {
        toast.error("Failed to load ticket");
        navigate("/support");
      } finally {
        setFetching(false);
      }
    };
    fetchTicket();
  }, [id, navigate]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticket?.messages]);

  /* ================= SUBMIT REPLY ================= */
  const handleSubmit = async () => {
    if (!reply.trim()) return toast.error("Reply is required");
    setLoading(true);
    try {
      await replySupportTicket(id, {
        message: reply,
      });
      toast.success("Reply sent");
      setReply("");
      // Refresh ticket to get latest messages
      const refreshed = await getSupportTicketById(id);
      setTicket(refreshed.data);
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    // optimistic UI
    setStatus(newStatus);
    try {
      await updateSupportStatus(id, newStatus);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
      // rollback UI
      setStatus(ticket.status);
    }
  };

  // Handle Enter key to submit
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (fetching) {
    return (
      <div className="p-6 text-center text-gray-500">Loading ticket...</div>
    );
  }

  if (!ticket) return null;

  const groupedMessages = groupMessagesByDate(ticket.messages);

  return (
    <>
      <PageMeta title="Support Ticket" />
      <PageBreadcrumb
        pageTitle="Support"
        links={[
          { name: "Support", path: "/support" },
          { name: `Ticket #${ticket.ticket_number}` },
        ]}
      />
      
      <div className="flex flex-col h-[calc(100vh-180px)] rounded-xl border bg-white overflow-hidden">
        {/* HEADER - Fixed at top */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${
                ticket.status === "OPEN" ? "bg-green-500" : "bg-gray-400"
              }`} />
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Ticket# {ticket.ticket_number}
                </h2>
                <p className="text-xs text-gray-500">
                  {ticket.user_email} • {ticket.priority}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="rounded-lg border px-3 py-1 text-sm"
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
              <span className="text-xs text-gray-400">
                {formatDate(ticket.created_at)}
              </span>
            </div>
          </div>
          
          {/* SUBJECT */}
          <div className="mt-3">
            <h3 className="text-md font-semibold text-gray-900">
              Subject: {ticket.subject}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{ticket.description}</p>
          </div>
        </div>

        {/* ================= CHAT MESSAGES ================= */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {groupedMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400">No messages yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedMessages.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Date Separator */}
                  <div className="flex justify-center my-4">
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                      {formatDate(group.date)}
                    </span>
                  </div>
                  
                  {/* Messages for this date */}
                  <div className="space-y-2">
                    {group.messages.map((msg, msgIndex) => {
                      const isAdmin = msg.sender_role === "SUPER_ADMIN" || msg.sender_role === "ADMIN";
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xl rounded-2xl px-4 py-2 ${isAdmin
                                ? "bg-blue-500 text-white rounded-tr-none"
                                : "bg-white border rounded-tl-none"
                              }`}
                          >
                            <p className="text-sm break-words">{msg.message}</p>
                            <div
  className={`mt-0.5 flex justify-end ${
    isAdmin ? "text-blue-100/80" : "text-gray-400"
  }`}
>
  <span className="text-[10px] leading-none">
    {formatTime(msg.created_at)}
  </span>
</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ================= REPLY FORM (Fixed at bottom) ================= */}
        <div className="border-t bg-white p-4">
  {isClosed ? (
    /* CLOSED TICKET MESSAGE */
    <div className="flex items-center justify-center">
      <span className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-600">
        🔒 This ticket has been closed
      </span>
    </div>
  ) : (
    /* ACTIVE REPLY BOX */
    <>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            rows={1}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full resize-none rounded-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !reply.trim()}
          className={`rounded-full p-3 ${
            loading || !reply.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <span className="text-sm">Sending...</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </>
  )}
</div>

      </div>
    </>
  );
}