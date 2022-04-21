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
};
