import ChangePassword from "@/components/profile/ChangePassword";
import ProfileInformation from "@/components/profile/ProfileInformation";

const Profile = () => {
  return (
    <div className="lib-container py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-1">Profile Settings</h1>
        <p className="leading-relaxed text-muted-foreground">
          Manage your profile information and change your password here.
        </p>
        {/* Profile Information */}
        <ProfileInformation />
        {/* Password Change */}
        <ChangePassword />
      </div>
    </div>
  );
};

export default Profile;
