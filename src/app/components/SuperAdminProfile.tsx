import React, { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  Key, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Smartphone, 
  Clock, 
  Save, 
  RefreshCw,
  Globe,
  Shield,
  BadgeCheck
} from "lucide-react";
import { PageHeader } from "./hb/listing/PageHeader";
import { PrimaryButton, SecondaryButton } from "./hb/listing";
import { toast } from "sonner";

export default function SuperAdminProfile() {
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "permissions">("personal");

  // Profile Form State
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "superadmin@guardianlayer.com",
    phone: "+1 (555) 019-2834",
    department: "Platform Operations & Governance",
    jobTitle: "Chief Super Administrator",
    timezone: "(UTC-05:00) Eastern Time (US & Canada)",
    language: "English (US)",
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile details updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6 text-xs animate-fadeIn">
      {/* HB Page Header */}
      <PageHeader
        pageId="profile"
        action="list"
      />

      {/* Top Header Profile Summary Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar Circle */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white dark:border-neutral-800">
                JD
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full border-2 border-white dark:border-neutral-900" title="Active Account">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Title & Identifiers */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                  {profile.fullName}
                </h1>
                <span className="text-[11px] font-semibold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded-full border border-primary-200 dark:border-primary-800 flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-primary-600" />
                  Super Administrator
                </span>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  {profile.email}
                </span>
                <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                  Guardian Layer SA
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-center min-w-[110px]">
              <div className="text-neutral-400 text-[10px] font-semibold uppercase">Account Status</div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
              </div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-center min-w-[110px]">
              <div className="text-neutral-400 text-[10px] font-semibold uppercase">Security Score</div>
              <div className="text-xs font-bold text-primary-600 dark:text-primary-400 mt-0.5">
                98% (High)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standard HB Horizontal Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex gap-6 text-xs font-semibold">
          {[
            { id: "personal", label: "Personal Information", icon: User },
            { id: "security", label: "Security & Credentials", icon: Key },
            { id: "permissions", label: "Platform Permissions", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? "border-primary-600 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: PERSONAL INFORMATION */}
      {activeTab === "personal" && (
        <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Profile & Contact Information</h3>
                <p className="text-neutral-500 text-xs mt-0.5">Update your personal account details and communication preferences.</p>
              </div>
              <SecondaryButton onClick={() => toast.info("Profile data refreshed")}>
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
              </SecondaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                  Full Name <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  required
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                  Email Address <span className="text-error-500">*</span>
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Job Title
                </label>
                <input
                  type="text"
                  value={profile.jobTitle}
                  onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Department
                </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Timezone
                </label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="(UTC-05:00) Eastern Time (US & Canada)">(UTC-05:00) Eastern Time (US & Canada)</option>
                  <option value="(UTC+00:00) UTC Universal Time">(UTC+00:00) UTC Universal Time</option>
                  <option value="(UTC+05:30) India Standard Time (IST)">(UTC+05:30) India Standard Time (IST)</option>
                  <option value="(UTC+01:00) Central European Time (CET)">(UTC+01:00) Central European Time (CET)</option>
                </select>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
              <SecondaryButton onClick={() => toast.info("Changes discarded")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton icon={Save} type="submit">
                Save Profile
              </PrimaryButton>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY & CREDENTIALS */}
      {activeTab === "security" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Change Password Card */}
          <form onSubmit={handleChangePassword} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary-600" />
                Change Password
              </h3>
              <p className="text-neutral-500 text-xs mt-0.5">Ensure your account is using a long, strong, and unique password.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Current Password <span className="text-error-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  New Password <span className="text-error-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <p className="text-[11px] text-neutral-400">At least 8 characters long</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Confirm New Password <span className="text-error-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
              <PrimaryButton icon={Key} type="submit">
                Update Password
              </PrimaryButton>
            </div>
          </form>

          {/* Two-Factor Authentication Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Hardware authenticator app (TOTP) is currently active on your account.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-200">
                Enabled
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM PERMISSIONS */}
      {activeTab === "permissions" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-600" />
              Super Administrator Access Control Matrix
            </h3>
            <p className="text-neutral-500 text-xs mt-0.5">Assigned platform capabilities and administrative privileges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Full Organization Control", desc: "Create, modify, soft delete, and impersonate any organization across the portal." },
              { title: "Global Model Master Management", desc: "Configure global LLM catalog, TPM/RPM limits, and provider routing rules." },
              { title: "Budget & Rate Limit Overrides", desc: "Assign and override monetary caps and token throughput quotas dynamically." },
              { title: "Audit & Telemetry Access", desc: "Full access to platform-wide telemetry, API logs, and administrative event logs." },
            ].map((perm, idx) => (
              <div key={idx} className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-neutral-900 dark:text-white">{perm.title}</div>
                  <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">{perm.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
