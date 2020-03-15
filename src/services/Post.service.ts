import axios from 'axios';
export class PostService {
  URL = 'http://localhost:5000/api/posts';

  getQuestionsAndAnswers() {
    return axios.get(this.URL + '/fullposts');
  }

  getQuestionAndAnswer(questionId: number) {
    return axios.get(`${this.URL}/fullposts/${questionId}`);
  }
}
