import api from "@/services/api";
//
export default {
  getAllUsers() {
    return api().get("./api/auth/users");
  },
  getOneUser(id) {
    return api().get("./api/auth/user/" + id);
  },
  deleteOneUser(id) {
    return api().delete("./api/auth/user/" + id);
  },
  delOneUser(id) {
    return api().delete("./api/auth/oneuser/" + id);
  },
};
