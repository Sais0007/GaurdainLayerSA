import React from "react";
import { RequestLogsManagement } from "./RequestLogsManagement";

export default function LogsPage() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <RequestLogsManagement />
    </div>
  );
}

export { RequestLogsManagement as LogsPage, RequestLogsManagement };
