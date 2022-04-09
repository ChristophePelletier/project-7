import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  post(article) {
    return api().post("./api/article", article);
  },
};
