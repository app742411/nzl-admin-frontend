import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import toast from "react-hot-toast";
import { changePassword } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password changed successfully. Please login again.");

      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
      }, 800);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Old password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label>Old Password</Label>
        <Input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>New Password</Label>
        <Input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
}
