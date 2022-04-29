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
  deleteOneComment(id) {
    return api().delete("./api/comment/" + id);
  },
  getuserRecentComments(userId) {
    return api().get("./api/usercomment/" + userId);
  },
  getuserRecentCommentsWithArticles(userId) {
    return api().get("./api/usercommentswitharticles/" + userId);
  },
};
