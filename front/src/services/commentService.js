import api from "@/services/api";
import { withParams } from "vuelidate";
//
export default {
  post(comment) {
    console.log("commentService");
    return api().post("./api/comment/" + params.id);
  },
};
