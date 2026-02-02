import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "../../api/authApi";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function UserInfoCard({ user, setUser }) {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/images/user/owner.jpg");

  /* ===== SYNC PROPS → STATE ===== */
  useEffect(() => {
    if (!user) return;

    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone_number || "",
    });

    setAvatarPreview(
      user.profile_img
        ? `${BASE_URL}/uploads/admin/${user.profile_img}`
        : "/images/user/owner.jpg",
    );
  }, [user]);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  /* ===== UPDATE PROFILE ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);

      if (avatarFile) payload.append("profile_img", avatarFile);

      await updateProfile(payload);

      toast.success("Profile updated successfully");
      window.location.reload();
      setUser((prev) => ({
        ...prev,
        ...formData,
        phone_number: formData.phone,
      }));

      closeModal();
    } catch (err) {
      toast.error("Profile update failed");
    }
  };

  if (!user) return null;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* PROFILE VIEW */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
            <Info label="First Name" value={user.first_name} />
            <Info label="Last Name" value={user.last_name} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone_number} />
          </div>
        </div>

        <button onClick={openModal} className="btn-primary">
          Edit
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl">
          <h4 className="text-2xl font-semibold mb-4">
            Edit Personal Information
          </h4>

          {/* <div className="mb-6 flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border">
              <img
                src={avatarPreview}
                className="object-cover w-full h-full"
              />
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div> */}

          <div className="mb-6 flex items-center gap-4">
            {/* CLICKABLE AVATAR */}
            <label
              htmlFor="avatarUpload"
              className="relative w-24 h-24 rounded-full overflow-hidden border cursor-pointer group"
            >
              <img
                src={avatarPreview || "/images/user/owner.jpg"}
                alt="Avatar"
                className="object-cover w-full h-full"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                Change
              </div>
            </label>

            {/* HIDDEN FILE INPUT */}
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Field
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Field label="Email" value={formData.email} disabled />
            <Field
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

const Field = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <Input {...props} />
  </div>
);
