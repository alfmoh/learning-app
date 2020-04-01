import * as React from 'react';
import { Link } from '@reach/router';
import Post from '../Post';
import './Home.scss';
import { IQuestionAnswer } from '../../../models/IQuestionAnswer';
import { PostService } from '../../../services/Post.service';

class Home extends React.Component<any, any> {
    state = {
        posts: [] as Array<IQuestionAnswer>
    };

    async componentDidMount() {
        const service = new PostService();
        const { data } = await service.getQuestionsAndAnswers();
        this.setState({
            posts: data
        });
    }
    public render() {
        return (
            <div className="la-posts">
                {this.state.posts.map((post: IQuestionAnswer) => (
                    <Link
                        className="la-post-link no--link"
                        key={post.question.id}
                        to={'posts/' + post.question.id}
                    >
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        );
    }
}

export default Home;
