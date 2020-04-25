import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Helpers } from './../../../helpers/Helpers';
import { navigate } from '@reach/router';

class Unspecfic extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <h4>The search may refer to any of the following:</h4>
                {this.props.post?.shift() &&
                    this.props.post?.map(
                        (
                            post: { title: string; snippet: string },
                            i: number
                        ) => (
                            <List key={i}>
                                <List.Item>
                                    <List.Header
                                        onClick={() => {
                                            navigate(
                                                `/posts/${post?.title}`
                                            ).then(() => {
                                                this.props.loadTitle(
                                                    post?.title
                                                );
                                            });
                                        }}
                                        as="a"
                                    >
                                        {post?.title}
                                    </List.Header>
                                    <List.Description>
                                        {Helpers.convertHTML(post?.snippet)}
                                    </List.Description>
                                </List.Item>
                            </List>
                        )
                    )}
            </div>
        );
    }
}

export default Unspecfic;
