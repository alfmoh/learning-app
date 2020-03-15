import * as React from 'react';
import './Post.scss';
import { Helpers } from '../../../helpers/Helpers';

class Post extends React.Component<any, any> {
  state = {};

  render() {
    const { post } = this.props;
    return (
      <article className="la-card-content">
        <section className="la-card-content__question">
          <strong>{Helpers.trimParagraphs(post.question.title)}</strong>
        </section>
        <section className="la-card-content__answer">
          {Helpers.trimParagraphs(post.question.body)}
        </section>
      </article>
    );
  }
}

export default Post;
