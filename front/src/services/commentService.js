import api from "@/services/api";

export default {
  post(comment) {
    console.log("commentService");
    return api().post("./api/comment/", comment);
  },
};
