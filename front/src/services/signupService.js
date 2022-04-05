import api from "@/services/api";
//
export default {
  signup(identification) {
    return api().post("signup", identification);
  },
};
