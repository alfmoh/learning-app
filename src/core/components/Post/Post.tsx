import * as React from 'react';
import './Post.scss';


class Post extends React.Component<any, any> {
  state = {};

  trimParagraphs(body: string) {
    var temp = document.createElement('div');
    temp.innerHTML = body;
    var result = temp.textContent || temp.innerText || '';
    result = result.replace('\u200B', '').trim();
    return result.length > 250 ? result.slice(0, 250) + '......' : result;
  }

  render() {
    const { post } = this.props;
    return (
      <article className="la-card-content">
        <section className="la-card-content__question">
          <strong>{this.trimParagraphs(post.question.body)}</strong>
        </section>
        <section className="la-card-content__answer">
        {this.trimParagraphs(post.answer.body)}
        </section>
      </article>
    );
  }
}

export default Post;
