import * as React from 'react';
import { PostService } from '../../../services/Post.service';
import { IQuestionAnswer } from '../../../models/IQuestionAnswer';
import { Helpers } from '../../../helpers/Helpers';
import './PostDetail.scss';
import { Container, Divider } from 'semantic-ui-react';

class PostDetail extends React.Component<any, any> {
  state = {
    post: {} as IQuestionAnswer
  };
  async componentDidMount() {
    const service = new PostService();
    const { data } = await service.getQuestionAndAnswer(this.props.id);

    this.setState({
      post: data as IQuestionAnswer
    });
  }
  public render() {
    return (
      <Container>
        {this.state.post.question && (
          <div className="la-post-detail">
            <div className="la-post-detail-container">
              <div className="la-post-detail-question">
                <h3 className="la-post-detail-question__title">
                  {Helpers.trimParagraphs(this.state.post.question.title)}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.post.question.body
                  }}
                  className="la-post-detail-question__body la-left--space"
                >
                  {/* {Helpers.trimParagraphs(this.state.post.question.body, false)} */}
                </div>
              </div>
              <Divider />
              <h2>Answers</h2>
              <ul className="la-post-detail-answers">
                {/* {Helpers.trimParagraphs(this.state.post.answer.body, false)} */}
                <li
                  dangerouslySetInnerHTML={{
                    __html: this.state.post.answer.body
                  }}
                  className="la-post-detail-answers__body la-left--space"
                ></li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default PostDetail;
