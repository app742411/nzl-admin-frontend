import React, { useEffect, useState, useRef } from "react";
import ActivityItem from "./ActivityItem";
import { getActivity } from "../../../api/authApi";

export default function ActivityLog({ refreshTrigger }) {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const didLoadRef = useRef(false);

  const activityMap = {
    "create-role": { icon: "UserPlus", title: "Role Created", color: "green" },
    "assign-role": { icon: "UserCheck", title: "Role Assigned", color: "blue" },
    "update-role": { icon: "Settings2", title: "Role Updated", color: "amber" },
    "delete-role": { icon: "Trash2", title: "Role Deleted", color: "red" },
  };

  const loadActivities = async (pageNumber = 1) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await getActivity(pageNumber, 4);

      if (pageNumber === 1) {
        setActivities(res.data); // first load → replace
      } else {
        setActivities((prev) => [...prev, ...res.data]); // load more → append
      }

      setNextPage(res.nextPage); //  use backend nextPage field
    } catch (err) {
      console.error("Activity error:", err);
    } finally {
      setLoading(false);
    }
  };

  // FIRST LOAD + REFRESH HANDLING
  useEffect(() => {
    setActivities([]);
    setPage(1);
    setNextPage(null);

    didLoadRef.current = true;
    loadActivities(1);
  }, [refreshTrigger]);

  const handleLoadMore = () => {
    if (nextPage && !loading) {
      setPage(nextPage);
      loadActivities(nextPage);
    }
  };

  return (
    <section>
      <div className="bg-white p-5 rounded-xl shadow-sm border space-y-5">
        <h3 className="text-lg font-semibold mb-6">Activity Log</h3>

        {/*  No Activities At All */}
        {!loading && activities.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-5">
            No activities available
          </p>
        )}

        {/*   Render Activities */}
        {activities.map((a, index) => {
          const map = activityMap[a.activity] || {
            icon: "Info",
            title: "Activity",
            color: "gray",
          };

          return (
            <ActivityItem
              key={a.id}
              icon={map.icon}
              title={map.title}
              color={map.color}
              isLast={index === activities.length - 1}
              desc={`${a.activity_by.firstName} ${a.activity_by.lastName} performed "${map.title}" on ${a.activity_to.firstName} ${a.activity_to.lastName}`}
              //roles={`${a.changes_before} → ${a.changes_after}`}
              changes_before={a.changes_before}
              changes_after={a.changes_after}
              user={`${a.activity_by.firstName} ${a.activity_by.lastName}`}
              time={a.timeAgo}
            />
          );
        })}

        {/*  LOAD MORE BUTTON */}
        {nextPage && activities.length > 0 && (
          <div className="flex justify-center mt-4 mb-3">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="text-blue-600 hover:underline disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More Activities"}
            </button>
          </div>
        )}

        {/*  No More Pages */}
        {!nextPage && activities.length > 0 && (
          <p className="text-gray-500 text-sm text-center pb-3">
            No more activities
          </p>
        )}
      </div>
    </section>
  );
}
