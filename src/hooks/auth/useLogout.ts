import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = (): { logout: () => void } => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("verified");

    queryClient.removeQueries({queryKey: ["userDetails"]});
    queryClient.removeQueries({queryKey: ["login"]});
    queryClient.removeQueries({queryKey: ["signup"]});
    queryClient.removeQueries({queryKey: ["verifyEmail"]});

    router.push("/login");
  };

  return { logout };
};

export default useLogout;
