import api from "@/services/api";
//
export default {
  login(identification) {
    return api().post("./api/auth/login", identification);
  },
};
