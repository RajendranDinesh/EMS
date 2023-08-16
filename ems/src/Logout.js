import { SweetAlert } from "./components/SweetAlert";
import Cookies from "js-cookie";

export const logout = async () => {
    await SweetAlert({
        title: "Logout",
        children: "You have been logged out successfully!",
        icon: "success",
    });
    Cookies.remove('authToken');
    window.location.href = "/";
}