import { UserFromServer } from "@/api/typesApi";

export const getUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);

            if (user) {
                return user as UserFromServer;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return null;
};
