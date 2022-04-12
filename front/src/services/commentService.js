import api from "@/services/api";
//
export default {
  post(comment) {
    return api().post("./api/comment/" + id, comment);
  },
};
