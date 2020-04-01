import { WebService } from './Web.service';
import { QuestionAnswer } from '../models/IQuestionAnswer';
export class PostService extends WebService<QuestionAnswer | QuestionAnswer[]> {
    URL = 'posts/fullposts';

    getQuestionsAndAnswers() {
        return this.get<QuestionAnswer[]>();
    }

    getQuestionAndAnswer(questionId: number) {
        return this.get<QuestionAnswer>(`${questionId}`);
    }
}
