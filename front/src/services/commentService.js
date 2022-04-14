import api from "@/services/api";

export default {
  post(comment, articleId) {
    console.log("commentService");
    return api().post("./api/comment/", articleId);
  },
};
