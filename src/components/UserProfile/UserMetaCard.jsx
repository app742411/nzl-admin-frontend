const baseURL = import.meta.env.VITE_API_URL;

export default function UserMetaCard({ user }) {
  if (!user) return null;

  return (
    <div className="p-5 border rounded-2xl">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border">
          <img
            src={
              user.profile_img
                ? `${baseURL}/uploads/admin/${user.profile_img}`
                : "/images/user/owner.jpg"
            }
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h4>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-sm text-gray-500">{user.phone_number}</p>
        </div>
      </div>
    </div>
  );
}
