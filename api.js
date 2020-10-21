import Axios from "axios";

const SITE_URL = "https://softer052.cafe24.com/json/proc_json.php";

export const postData = (data) => Axios.post(SITE_URL, data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export const useInput = (text) => {
    const [word, setWord] = useState();  
    const onChange = e => {
      const {
        target: { value }
      } = e;

      if (value) {
        setWord(value);
      }
    };
    return { word, onChange };
};
