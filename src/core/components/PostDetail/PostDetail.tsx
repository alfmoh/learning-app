import * as React from 'react';
import { PostService } from '../../../services/Post.service';
import { IQuestionAnswer } from '../../../models/IQuestionAnswer';
import { Helpers } from '../../../helpers/Helpers';
import './PostDetail.scss';
import { Container, Divider } from 'semantic-ui-react';
import MJ from 'react-mathjax-ts';

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
    const getContent = (text: string) => {
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText;
    };

    const contentTransform = (text = '') => (
      <MJ.Context
        input="ascii"
        onLoad={() => console.log('Loaded MathJax script!')}
        onError={(MathJax: any, error: any) => {
          console.log('Encountered a MathJax error!');
          console.warn(error);
        }}
        options={{
          asciimath2jax: {
            useMathMLspacing: true,
            delimiters: [['$', '$', '$$']],
            preview: 'none'
          }
        }}
      >
        <div
          // dangerouslySetInnerHTML={{
          //   __html: this.state.post.answer.body
          // }}
          className="preserve--space la-left--space"
        >
          <MJ.Text text={getContent(text)} />
        </div>
      </MJ.Context>
    );

    return (
      <Container>
        {this.state.post.question && (
          <div className="la-post-detail">
            <div className="la-post-detail-container">
              <div className="la-post-detail-question">
                <h3 className="la-post-detail-question__title">
                  {Helpers.trimParagraphs(this.state.post.question.title)}
                </h3>
                <div className="la-post-detail-question__body">
                  {contentTransform(this.state.post.question.body)}
                </div>
              </div>
              <Divider />
              <h2>Answers</h2>
              <ul className="la-post-detail-answers">
                <li className="la-post-detail-answers__body">
                  {contentTransform(this.state.post.answer.body)}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default PostDetail;
