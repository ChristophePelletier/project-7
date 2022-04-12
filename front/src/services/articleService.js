import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  getOneArticle(id) {
    //console.log("testart id :", articleId);
    return api().get("./api/article/" + id);
  },
  post(article) {
    return api().post("./api/article", article);
  },
};
