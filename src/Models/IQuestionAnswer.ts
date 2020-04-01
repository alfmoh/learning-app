import { IPost } from './IPost';
export interface IQuestionAnswer {
    question: IPost;
    answer: IPost;
}

export class QuestionAnswer implements IQuestionAnswer {
    question: IPost;
    answer: IPost;
}
