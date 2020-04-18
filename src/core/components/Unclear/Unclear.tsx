import * as React from 'react';
import {
    Modal,
    Label,
    Container,
    Header,
    Button
} from 'semantic-ui-react';
import { Typeahead } from '@gforge/react-typeahead-ts';
import './Unclear.scss';

class Unclear extends React.Component<any, any> {
    public render() {
        return (
            <Modal
                size="tiny"
                trigger={this.props.triggerButton}
                centered={false}
            >
                <Modal.Header>What do you find unclear?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {this.props.keywords.length && (
                            <Container>
                                <div className="ui icon fluid input">
                                    <Typeahead
                                        placeholder="Search..."
                                        options={this.props.keywords}
                                        customClasses={{
                                            input:
                                                'la-unclear-modal-search__box',
                                            results: 'la-unclear-modal-results',
                                            listItem:
                                                'la-unclear-modal-results__item'
                                        }}
                                        maxVisible={2}
                                    />
                                    <Button
                                        className="la-unclear-modal-search__button"
                                        size="tiny"
                                        color="green"
                                    >
                                        Search
                                    </Button>
                                </div>
                                <Header>Top keywords:</Header>
                                <div className="la-unclear-modal-tags">
                                    {this.props.keywords.map(
                                        (keyword, index) => (
                                            <Label
                                                key={index}
                                                className="la-unclear-modal-tags__tag"
                                            >
                                                {keyword}
                                            </Label>
                                        )
                                    )}
                                </div>
                            </Container>
                        )}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default Unclear;
