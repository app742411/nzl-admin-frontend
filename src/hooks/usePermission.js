import { useSelector } from "react-redux";

export default function usePermission() {
  const permissions = useSelector((state) => state.auth.permissions);

  const has = (perm) => permissions.includes(perm);
  const hasAny = (list = []) => list.some((p) => permissions.includes(p));

  return { has, hasAny };
}
