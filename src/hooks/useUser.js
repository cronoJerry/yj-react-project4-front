import { useQuery } from "react-query";
import { loginSuccess } from "../api";

export default function useUser() {
	const { isLoading, data, refetch } = useQuery("loginSuccess", loginSuccess);
	return {
		userLoading: isLoading,
		isLoggedIn: data?.ok,
		user: data,
		refetch,
	};
}
