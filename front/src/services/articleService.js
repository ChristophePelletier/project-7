import api from "@/services/api";
//
export default {
  getAllArticles() {
    return api().get("./api/articles");
  },
  getOneArticle(id) {
    //console.log("testart id :", id);
    return api().get("./api/article/" + id);
  },
  post(formData) {
    return api().post("./api/article", formData);
  },
};
