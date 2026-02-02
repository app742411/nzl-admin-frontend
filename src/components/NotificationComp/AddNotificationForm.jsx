"use client";

import React, { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import InputField from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import SendAlertPopup from "./SendAlertPopup";
import templates from "./notificationTemplates";
import * as Icons from "lucide-react";

//   RIGHT SIDE FIELD ICONS
import {
  Users,
  LayoutTemplate,
  Clock,
  AlertTriangle,
  Type,
} from "lucide-react";

export default function AddNotificationForm() {
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  const [activeType, setActiveType] = useState("push");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [segment, setSegment] = useState("");
  const [schedule, setSchedule] = useState("");
  const [priority, setPriority] = useState("");

  const segmentOptions = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active Bidders" },
    { value: "new", label: "New Users" },
    { value: "premium", label: "Premium Members" },
  ];

  //   Auto-fill from templates
  const handleTemplateChange = (templateId) => {
    const selected = templates.find((t) => t.id === templateId);
    if (!selected) return;
    setTitle(selected.title);
    setMessage(selected.message);
  };

  //   Submit payload
  const handleSendCampaign = () => {
    const payload = {
      type: activeType,
      segment,
      title,
      message,
      schedule,
      priority,
    };

    console.log("FINAL PAYLOAD =>", payload);
    alert("Payload logged in console!");
  };

  return (
    <div className="min-h-screen space-y-4">
      {/*   STATS SECTION */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Sent"
          value="24,567"
          rate="+12% from last month"
          color="blue"
        />
        <StatCard
          title="Delivered"
          value="23,891"
          rate="92% delivery rate"
          color="green"
        />
        <StatCard
          title="Opened"
          value="15,234"
          rate="63% open rate"
          color="yellow"
        />
        <StatCard
          title="Clicked"
          value="8,945"
          rate="38.4% click rate"
          color="purple"
        />
      </div>

      <div className="flex justify-end items-center">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowAlertPopup(true)}
        >
          Send Alert
        </Button>
      </div>

      {/*   MAIN GRID */}
      <div className="grid grid-cols-3 gap-6 items-baseline">
        {/*   COMPOSER */}
        <ComponentCard className="col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Campaign Composer
          </h3>

          {/*   TABS */}
          <div className="flex gap-3 mb-6">
            <CampaignTab
              label="Push Notification"
              active={activeType === "push"}
              onClick={() => setActiveType("push")}
            />
            <CampaignTab
              label="SMS Campaign"
              active={activeType === "sms"}
              onClick={() => setActiveType("sms")}
            />
            <CampaignTab
              label="Email Campaign"
              active={activeType === "email"}
              onClick={() => setActiveType("email")}
            />
          </div>

          {/*   DYNAMIC FIELDS */}
          {activeType === "email" ? (
            <>
              <Label>Email Subject</Label>
              <div className="relative">
                <InputField
                  className="pr-10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter email subject"
                />
                <Type className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>

              <Label className="mt-4">Email Body</Label>
              <textarea
                className="w-full border rounded-lg p-3 h-40"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write email content..."
              />
            </>
          ) : activeType === "sms" ? (
            <>
              <Label>SMS Message (Max 160 chars)</Label>
              <textarea
                maxLength={160}
                className="w-full border rounded-lg p-3 h-28 mb-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type SMS message..."
              />
              <p className="text-xs text-gray-500 text-right">
                {message.length}/160 characters
              </p>
            </>
          ) : (
            <>
              <Label>Notification Title</Label>
              <div className="relative">
                <InputField
                  className="pr-10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                />
                <Type className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>

              <Label className="mt-4">Message</Label>
              <textarea
                className="w-full border rounded-lg p-3 h-28"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write push notification message..."
              />
            </>
          )}

          {/*   SEGMENT + TEMPLATE */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label>User Segment</Label>
              <div className="relative">
                <Select
                  className="pr-10"
                  options={segmentOptions}
                  onChange={(e) => setSegment(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Templates</Label>
              <div className="relative">
                <Select
                  className="pr-10"
                  options={templates.map((t) => ({
                    value: t.id,
                    label: t.label,
                  }))}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*   SCHEDULE + PRIORITY */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Schedule</Label>
              <div className="relative">
                <Select
                  className="pr-10"
                  options={[
                    { value: "now", label: "Send Now" },
                    { value: "later", label: "Schedule Later" },
                  ]}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Priority</Label>
              <div className="relative">
                <Select
                  className="pr-10"
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "High" },
                  ]}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*   BUTTONS */}
          <div className="flex gap-4 mt-6">
            <Button
              className="bg-blue-600 text-white px-5 py-2"
              onClick={handleSendCampaign}
            >
              Send Campaign
            </Button>
            <Button className="bg-gray-100 text-gray-700">Preview</Button>
            <Button className="bg-gray-100 text-gray-700">Save Draft</Button>
          </div>
        </ComponentCard>

        {/*   RIGHT SIDEBAR */}
        <div className="space-y-6">
          <ComponentCard>
            <h3 className="font-semibold text-gray-800 mb-2">
              Quick Templates
            </h3>

            {templates.slice(0, 4).map((t) => (
              <QuickTemplate
                key={t.id}
                title={t.title}
                desc={t.message}
                icon={t.icon}
              />
            ))}
          </ComponentCard>

          <ComponentCard>
            <h3 className="font-semibold text-gray-800 mb-2">User Segments</h3>
            <SegmentItem
              label="Active Bidders"
              count="6,217 users"
              color="green"
            />
            <SegmentItem label="New Users" count="1,327 users" color="blue" />
            <SegmentItem
              label="Premium Members"
              count="3,421 users"
              color="purple"
            />
            <SegmentItem
              label="Inactive Users"
              count="2,205 users"
              color="yellow"
            />
          </ComponentCard>
        </div>
      </div>

      {showAlertPopup && (
        <SendAlertPopup onClose={() => setShowAlertPopup(false)} />
      )}
    </div>
  );
}

/*   MINI COMPONENTS (UNCHANGED) */

const StatCard = ({ title, value, rate, color }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
      <p
        className={`text-xs mt-2 inline-block px-2 py-1 rounded ${colorMap[color]}`}
      >
        {rate}
      </p>
    </div>
  );
};

const CampaignTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border text-sm ${active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
  >
    {label}
  </button>
);

const QuickTemplate = ({ title, desc, icon }) => {
  const Icon = Icons[icon] || Icons.Bell;

  return (
    <div className="flex items-start gap-3 mb-3 p-2 rounded-lg hover:bg-gray-50 transition">
      <div className="p-3 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <Icon size={18} />
      </div>

      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
};

const SegmentItem = ({ label, count, color }) => {
  const dot = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
  }[color];

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span>{label}</span>
      </div>
      <span className="text-sm text-gray-500">{count}</span>
    </div>
  );
};
