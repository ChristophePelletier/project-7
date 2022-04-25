import api from "@/services/api";
//
export default {
  getAllUsers() {
    return api().get("./api/auth/users");
  },
  getOneUser(id) {
    //console.log("testart id :", id);
    return api().get("./api/auth/user/" + id);
  },
  deleteOneUser(id) {
    //console.log("testart id :", id);
    return api().delete("./api/auth/user/" + id);
  },
  delOneUser(id) {
    return api().delete("./api/auth/oneuser/" + id);
  },
};
