import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  getOneArticle(articleId) {
    //console.log("testart id :", articleId);
    return api().get("./api/article/" + articleId);
  },
  post(article) {
    return api().post("./api/article", article);
  },
};
