import api from "@/services/api";
//
export default {
  signup(identification) {
    return api().post("./api/auth/signup", identification);
  },
  signupAdmin(identification) {
    return api().post("./api/auth/signupAdmin", identification);
  },
};
