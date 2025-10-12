import AccountActions from "@/components/settings/AccountActions";
import AccountInformation from "@/components/settings/AccountInformation";
import DangerZone from "@/components/settings/DangerZone";
import DataManagement from "@/components/settings/DataManagement";

const Settings = () => {
  return (
    <div className="lib-container py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="leading-relaxed text-muted-foreground mb-5">
          Manage your account settings, preferences, and data here.
        </p>
        {/* Account Actions */}
        <AccountActions />

        {/* Account Information */}
        <AccountInformation />

        {/* Data Management */}
        <DataManagement />

        {/* Danger Zone */}
        <DangerZone />
      </div>
    </div>
  );
};

export default Settings;
