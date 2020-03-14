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
          <strong>{this.trimParagraphs(post.body)}</strong>
        </section>
        <section className="la-card-content__answer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut
          magni recusandae excepturi tempore. Minus illum voluptatibus
          necessitatibus molestias, aut laudantium vero at nostrum tempora optio
          itaque sequi rem odio?
        </section>
      </article>
    );
  }
}

export default Post;
