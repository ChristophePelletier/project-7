import api from "@/services/api";

export default {
  post(comment) {
    console.log("commentService");
    return api().post("./api/comment/", comment);
  },
  getArticleComments(articleId) {
    return api().get("./api/comment/" + articleId);
  },
  getAllComments() {
    return api().get("./api/comment/");
  },
};
