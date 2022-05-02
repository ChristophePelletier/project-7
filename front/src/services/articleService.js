import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  getRecentArticles() {
    return api().get("./api/articles");
  },
  getOneArticle(id) {
    return api().get("./api/article/" + id);
  },
  post(formData) {
    return api().post("./api/article", formData);
  },
  getuserRecentArticles(userId) {
    return api().get("./api/userarticle/" + userId);
  },
  deleteOneArticle(id) {
    return api().delete("./api/article/" + id);
  },
  getArticlesWithComments() {
    return api().get("./api/articleswithcomments/");
  },
  getAllArticlesWithComments() {
    return api().get("./api/allArticleswithcomments/");
  },
};
