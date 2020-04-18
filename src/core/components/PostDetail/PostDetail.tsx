import * as React from 'react';
import { PostService } from '../../../services/Post.service';
import { Helpers } from '../../../helpers/Helpers';
import './PostDetail.scss';
import { Container, Divider, Label } from 'semantic-ui-react';
import MJ from 'react-mathjax-ts';
import PostForm from '../PostForm';
import { Link, navigate, globalHistory } from '@reach/router';
import LaLoader from '../../../shared/components/Loader';
import { AppContext } from '../../../shared/contexts/Context';
import { TagService } from '../../../services/Tag.service';

class PostDetail extends React.Component<any, any> {
    postService: PostService;
    tagService: TagService;
    prevState = '';
    safetyFlag = false;
    sub$: any;
    constructor(props) {
        super(props);
        this.postService = new PostService();
        this.tagService = new TagService();
        this.loadTag = this.loadTag.bind(this);
    }
    static contextType = AppContext;
    state = {
        post: {} as any
    };

    async componentDidMount() {
        this.urlChanged();
        this.sub$ = globalHistory.listen(({ action }) => {
            if (action === 'POP') {
                this.prevState = this.props.id;
                this.safetyFlag = true;
            }
        });
    }

    componentDidUpdate() {
        if (this.prevState !== this.props.id && this.safetyFlag) {
            this.urlChanged();
            this.prevState = this.props.id;
            this.safetyFlag = false;
        }
    }

    componentWillUnmount() {
        this.sub$();
    }

    private async urlChanged() {
        if (+this.props.id) {
            const { data } = await this.postService.getQuestionAndAnswer(
                this.props.id
            );
            window.scrollTo(0, 0);
            this.setState({
                post: data as any
            });
        } else {
            this.loadTag(this.props.id);
        }
    }

    async loadTag(tag: any) {
        const { data } = await this.tagService.get(tag);
        const pageData = data?.query?.pages;
        this.setState({
            post: pageData[Object.keys(pageData)[0]]
        });
        window.scrollTo(0, 0);
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
                {this.state.post.question || this.state.post.title ? (
                    <div className="la-post-detail">
                        <div className="la-post-detail-container">
                            <div className="la-post-detail-question">
                                <h3 className="la-post-detail-question__title">
                                    {Helpers.trimParagraphs(
                                        this.state.post?.question?.title ||
                                            this.state.post?.title
                                    )}
                                </h3>
                                <div className="la-post-detail-question__body">
                                    {contentTransform(
                                        this.state.post?.question?.body
                                    )}
                                </div>
                            </div>
                            <div className="la-post-detail-tags">
                                {(
                                    (this.state.post?.question?.tags || '')
                                        .replace(/</gi, '')
                                        .split('>') || []
                                ).map((tag, index) => {
                                    if (tag) {
                                        return (
                                            <Label
                                                className="la-post-detail-tags__tag"
                                                key={index}
                                                onClick={() => {
                                                    navigate(
                                                        `/posts/${tag}`
                                                    ).then(() => {
                                                        this.loadTag(tag);
                                                    });
                                                }}
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
                                    {this.state.post?.answer?.body
                                        ? contentTransform(
                                              this.state.post.answer.body
                                          )
                                        : this.state.post?.extract}
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
