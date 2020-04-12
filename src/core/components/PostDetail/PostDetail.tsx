import * as React from 'react';
import { PostService } from '../../../services/Post.service';
import { IQuestionAnswer } from '../../../models/IQuestionAnswer';
import { Helpers } from '../../../helpers/Helpers';
import './PostDetail.scss';
import { Container, Divider, Label } from 'semantic-ui-react';
import MJ from 'react-mathjax-ts';
import PostForm from '../PostForm';
import { Link } from '@reach/router';
import LaLoader from '../../../shared/components/Loader';
import { AppContext } from '../../../shared/contexts/Context';

class PostDetail extends React.Component<any, any> {
    static contextType = AppContext;
    state = {
        post: {} as IQuestionAnswer
    };

    async componentDidMount() {
        const { appPath } = this.props;
        console.log(appPath);
        const postService = new PostService();

        const { data } = await postService.getQuestionAndAnswer(this.props.id);
        window.scrollTo(0, 0);

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
                {this.state.post.question ? (
                    <div className="la-post-detail">
                        <div className="la-post-detail-container">
                            <div className="la-post-detail-question">
                                <h3 className="la-post-detail-question__title">
                                    {Helpers.trimParagraphs(
                                        this.state.post.question.title
                                    )}
                                </h3>
                                <div className="la-post-detail-question__body">
                                    {contentTransform(
                                        this.state.post.question.body
                                    )}
                                </div>
                            </div>
                            <div className="la-post-detail-tags">
                                {(
                                    (this.state.post.question.tags || '')
                                        .replace(/</gi, '')
                                        .split('>') || []
                                ).map((tag, index) => {
                                    if (tag) {
                                        return (
                                            <Label
                                                className="la-post-detail-tags__tag"
                                                key={index}
                                            >
                                                {tag}
                                            </Label>
                                        );
                                    }
                                    return '';
                                })}
                            </div>
                            <Divider />
                            <h2>Answers</h2>
                            <ul className="la-post-detail-answers">
                                <li className="la-post-detail-answers__body">
                                    {contentTransform(
                                        this.state.post.answer.body
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <LaLoader />
                    </div>
                )}
                <h2>Your Answer</h2>
                <div className="la-left--space">
                    <div className="la-post-detail-answer-form">
                        {!this.context.auth.loginUser ? (
                            <Link className="no--link" to={'/auth'}>
                                <button className="ui primary button la-post-detail-answer-form__login-button">
                                    Login to answer
                                </button>
                            </Link>
                        ) : (
                            <PostForm></PostForm>
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}

export default PostDetail;
