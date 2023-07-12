import { SweetAlert } from "./components/SweetAlert";

export const logout = async () => {
    await SweetAlert({
        title: "Logout",
        children: "You have been logged out successfully!",
        icon: "success",
    });
    localStorage.removeItem("token");
    window.location.href = "/";
}