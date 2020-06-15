import * as React from 'react';
import { PostService } from '../../../services/Post.service';
import { Helpers } from '../../../helpers/Helpers';
import './PostDetail.scss';
import { Container, Divider, Label, Icon } from 'semantic-ui-react';
import MJ from 'react-mathjax-ts';
import PostForm from '../PostForm';
import { Link, navigate, globalHistory } from '@reach/router';
import LaLoader from '../../../shared/components/Loader';
import { AppContext } from '../../../shared/contexts/Context';
import { TagService } from '../../../services/Tag.service';
import rake from 'rake-js';

import Unclear from '../Unclear';
import Unspecfic from '../Unspecfic';
import { IPost } from '../../../models/IPost';
import { Neo4jService } from '../../../services/Neo4j.service';

export let PostDetailInstance = null;
class PostDetail extends React.Component<any, any> {
    postService: PostService;
    tagService: TagService;
    prevState = '';
    safetyFlag = false;
    sub$: any;
    votesRef: React.RefObject<any>;
    neoService: Neo4jService;
    constructor(props: any) {
        super(props);
        PostDetailInstance = this;

        this.postService = new PostService();
        this.tagService = new TagService();
        this.loadTag = this.loadTag.bind(this);
        this.onUnclear = this.onUnclear.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onSafetyFlag = this.onSafetyFlag.bind(this);
        this.votesRef = React.createRef();
        this.neoService = new Neo4jService();
    }
    static contextType = AppContext;
    state = {
        post: {} as any,
        keywords: [],
        showModal: false,
        searchData: []
    };

    async componentDidMount() {
        this.urlChanged();
        this.sub$ = globalHistory.listen(({ action }) => {
            if (action === 'POP') {
                this.prevState = this.props.id;
                this.onSafetyFlag();
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

    onUnclear() {
        const answer =
            this.state.post?.answers?.map(x => x.body).join(' ') ||
            this.state.post?.answers?.map(x => x.extract).join(' ');
        const rawText = Helpers.convertHTML(answer);
        const keywords = rake(rawText);

        const keyWordsNoDup = this.processKeywords(keywords);

        this.setState(
            {
                keywords: keyWordsNoDup
            },
            () => {
                this.toggleModal(true);
            }
        );
        // console.log(keywordsFilter);
    }

    toggleModal(showModal: boolean) {
        this.setState({
            showModal
        });
    }

    onSafetyFlag() {
        this.safetyFlag = true;
    }

    async loadTag(searchWord: any) {
        const { data } = await this.tagService.get(searchWord);
        const pageData = data?.query?.pages;

        const filteredCats = this.processCategories(pageData).map(x =>
            x.slice(x.indexOf(':') + 1, x.length)
        );
        filteredCats.push(searchWord);
        
        console.log(filteredCats);
        this.neoService.createNodes(filteredCats);
        this.setState({
            post: {
                answers: [pageData[Object.keys(pageData)[0]]],
                title: pageData[Object.keys(pageData)[0]].title
            },
            searchData: data?.query?.search
        });
        window.scrollTo(0, 0);
    }

    private processKeywords(keywords) {
        // filter long phrases and short words
        const keywordsFilter: string[] = (keywords || [])
            .filter(
                (keyword: string) =>
                    keyword?.split(' ').length - 1 < 2 && keyword?.length > 3
            )
            .map((keyword: string) => keyword.trim().replace(/^'+|'+$/g, ''))
            .sort((x: string, y: string) => y?.length - x?.length);
        // const topKeywords = keywordsFilter.slice();

        // returning single keywords instead of phrases
        const topKeywords: string[] = [].concat.apply(
            [],
            keywordsFilter.map(word => word.trim().split(' '))
        );

        // removing duplicates
        const keyWordsNoDup = topKeywords.filter(
            (word, index) =>
                topKeywords.indexOf(word.replace(/^'+|'+$/g, '')) === index
        );
        return keyWordsNoDup;
    }

    private processCategories(pageData) {
        const filteredWords = [
            'articles',
            'sources (',
            'wikipedia',
            'authors',
            'cs1',
            'disambiguation',
            'article',
            'dates',
            'webarchive template',
            'accuracy disputes',
            'pages needing',
            'maint',
            'wikidata',
            'npov disputes',
            '802',
            'commons category',
            'burial sites of the house',
            'births',
            'deaths',
            'ac with',
            'introductions',
            'inventions',
            'pages with'
        ];

        const categories: string[] = (
            pageData[Object.keys(pageData)[0]]?.categories || [{}]
        ).map(x => x.title);

        const filteredCats = categories
            .filter(
                cat =>
                    !filteredWords.find(fW =>
                        cat?.toLocaleLowerCase()?.includes(fW)
                    ) && cat?.length < 35
            )
            .filter(x => Boolean(x));
        return filteredCats;
    }

    private async urlChanged() {
        if (+this.props?.id) {
            const { data } = await this.postService.getQuestionAndAnswer(
                this.props.id
            );
            window.scrollTo(0, 0);
            this.setState({
                post: data as any
            });
        } else {
            let searchWord: string = this.props.id.toLocaleLowerCase();
            if (searchWord.includes('concepts in'))
                searchWord = searchWord
                    .toLocaleLowerCase()
                    .replace('concepts in', '')
                    .trim();
            this.loadTag(searchWord);
        }
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
                        delimiters: [
                            ['$', '$', '$$', '$$'],
                            ['{\\displaystyle', '}'],
                            ['{\\textstyle', '}'],
                            ['{\\frac', '}'],
                            ['{\\begin', '}'],
                            ['{\\end{', '}']
                        ],
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
            <React.Fragment>
                <Container>
                    {this.state.post.question || this.state.post.title ? (
                        <Container>
                            <div className="la-post-detail">
                                <div className="la-post-detail-container content--background">
                                    <div className="la-post-detail-question">
                                        <h3 className="la-post-detail-question__title">
                                            {Helpers.trimParagraphs(
                                                this.state.post?.question
                                                    ?.title ||
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
                                            (
                                                this.state.post?.question
                                                    ?.tags || ''
                                            )
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
                                                                this.loadTag(
                                                                    tag
                                                                );
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
                                        {this.state.post?.answers.map(
                                            (
                                                answer: IPost | any,
                                                index: number
                                            ) => (
                                                <React.Fragment key={index}>
                                                    <li className="la-post-detail-answers-body">
                                                        <span
                                                            ref={this.votesRef}
                                                            className="la-post-detail-answers-body-votes"
                                                        >
                                                            <Icon
                                                                onClick={(
                                                                    event: any
                                                                ) =>
                                                                    this.scoreUpdate(
                                                                        'upvote',
                                                                        answer,
                                                                        event.target
                                                                    )
                                                                }
                                                                name="sort up"
                                                                size="huge"
                                                                className="la-post-detail-answers-body-votes__upvote vote--button"
                                                            />
                                                            <div className="la-post-detail-answers-body-votes__num">
                                                                {
                                                                    ~~answer?.score
                                                                }
                                                            </div>
                                                            <Icon
                                                                onClick={(
                                                                    event: any
                                                                ) =>
                                                                    this.scoreUpdate(
                                                                        'downvote',
                                                                        answer,
                                                                        event.target
                                                                    )
                                                                }
                                                                name="sort down"
                                                                size="huge"
                                                                className="la-post-detail-answers-body-votes__downvote vote--button"
                                                            />
                                                        </span>
                                                        <span>
                                                            {answer?.body ? (
                                                                contentTransform(
                                                                    answer.body
                                                                )
                                                            ) : (answer?.extract as string)
                                                                  ?.toLocaleLowerCase()
                                                                  ?.endsWith(
                                                                      'may refer to:'
                                                                  ) ? (
                                                                <Unspecfic
                                                                    post={
                                                                        this
                                                                            .state
                                                                            .searchData
                                                                    }
                                                                    loadTitle={
                                                                        this
                                                                            .loadTag
                                                                    }
                                                                />
                                                            ) : (
                                                                answer?.extract
                                                            )}
                                                        </span>
                                                    </li>
                                                    <Divider />
                                                </React.Fragment>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <Container className="la-choice-actions">
                                <div>
                                    <Unclear
                                        keywords={this.state.keywords}
                                        keywordSearch={this.onSafetyFlag}
                                        showModal={this.state.showModal}
                                        toggleModal={this.toggleModal}
                                        triggerButton={
                                            <Label
                                                className="la-choice-actions__btn"
                                                color="orange"
                                                size="large"
                                                onClick={this.onUnclear}
                                            >
                                                <Icon
                                                    disabled
                                                    name="angle double left"
                                                />
                                                <span>Unclear</span>
                                            </Label>
                                        }
                                    ></Unclear>
                                </div>
                                <div>
                                    {/* <Label
                                        className="la-choice-actions__btn"
                                        color="green"
                                        size="large"
                                    >
                                        <span>Clear</span>
                                        <Icon
                                            className="la-choice-actions-icons__right"
                                            disabled
                                            name="angle double right"
                                        />
                                    </Label> */}
                                </div>
                            </Container>
                        </Container>
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
            </React.Fragment>
        );
    }

    private scoreUpdate(
        buttonType: string,
        answer: IPost,
        target: HTMLElement
    ) {
        const clickedButton = Array.from(
            target.parentElement.children
        ).filter((child: any) =>
            child.className.includes(buttonType)
        )[0] as HTMLElement;
        const otherButton = Array.from(
            target.parentElement.children
        ).filter((child: any) =>
            child.className.includes(
                buttonType === 'upvote' ? 'downvote' : 'upvote'
            )
        )[0] as HTMLElement;
        if (!clickedButton.className.includes('disabled')) {
            this.setState((prevState: any) => ({
                post: {
                    ...prevState.post,
                    answers: [...prevState.post.answers].map((ans: IPost) => {
                        if (answer.id === ans.id && buttonType === 'upvote') {
                            ans.score = ~~ans.score + 1;
                        }

                        if (answer.id === ans.id && buttonType === 'downvote') {
                            ans.score = ~~ans.score - 1;
                        }
                        return ans;
                    })
                }
            }));
            clickedButton.classList.add('disabled');
            clickedButton.setAttribute('aria-disabled', 'true');
            otherButton.classList.remove('disabled');
            otherButton.setAttribute('aria-disabled', 'false');
        }
    }
}

export default PostDetail;
