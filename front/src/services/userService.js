import api from "@/services/api";
//
export default {
  getAllUsers() {
    return api().get("./api/auth/users");
  },
};
