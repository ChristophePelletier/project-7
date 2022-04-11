import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  getOneArticle(articleId) {
    return api().get("article/" + articleId);
  },
  post(article) {
    return api().post("./api/article", article);
  },
};
