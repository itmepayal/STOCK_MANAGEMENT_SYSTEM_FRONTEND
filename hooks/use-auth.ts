// hooks/use-auth.ts
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutApiMutation,
  useRefreshMutation,
} from "@/store/services/authApi";
import { setCredentials, logout } from "@/store/features/auth/authSlice";
import type { RootState } from "@/store";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [loginUser, state] = useLoginMutation();

  const login = async (data: any) => {
    const res = await loginUser(data).unwrap();
    dispatch(
      setCredentials({
        user: res.data.user,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
      }),
    );
    return res;
  };

  return { login, ...state };
};

export const useRegister = () => {
  const [registerUser, state] = useRegisterMutation();

  const register = async (data: any) => {
    const res = await registerUser(data).unwrap();
    return res;
  };

  return { register, ...state };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const [logoutApi, state] = useLogoutApiMutation();
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );

  const performLogout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken).unwrap();
      }
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed:", err);
      dispatch(logout());
    }
  };

  return { performLogout, ...state };
};

export const useRefresh = () => {
  const dispatch = useDispatch();
  const [refreshApi] = useRefreshMutation();
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );

  const refresh = async () => {
    if (!refreshToken) return null;
    try {
      const res = await refreshApi(refreshToken).unwrap();
      dispatch(
        setCredentials({
          user: res.data.user,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        }),
      );
      return res;
    } catch (err) {
      console.error("Refresh failed:", err);
      dispatch(logout());
      return null;
    }
  };

  return { refresh };
};
