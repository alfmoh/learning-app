import * as React from 'react';
import { Modal, Label, Container, Header, Button } from 'semantic-ui-react';
import { Typeahead } from '@gforge/react-typeahead-ts';
import './Unclear.scss';
import { navigate } from '@reach/router';

class Unclear extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.getInputValue = this.getInputValue.bind(this);
    }
    inputValueRef = '';

    state = {
        keyword: '',
        modalOpen: false
    };

    onSearch() {
        this.state.keyword &&
            navigate(`/posts/${this.state.keyword}`).then(() => {
                this.props.toggleModal(false);
                this.props.keywordSearch();
            });
    }
    getInputValue(buttonClick = false, inputValue = '') {
        this.inputValueRef = inputValue && inputValue;
        buttonClick &&
            inputValue &&
            this.setState({ keyword: inputValue }, this.onSearch);
    }

    public render() {
        return (
            <Modal
                size="tiny"
                trigger={this.props.triggerButton}
                centered={false}
                open={this.props.showModal}
                onClose={() => this.props.toggleModal(false)}
            >
                <Modal.Header>What do you find unclear?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {this.props.keywords.length && (
                            <Container>
                                <div className="ui icon fluid input">
                                    <Typeahead
                                        onChange={val =>
                                            this.getInputValue(
                                                false,
                                                val.target.value
                                            )
                                        }
                                        placeholder="Search..."
                                        options={this.props.keywords}
                                        customClasses={{
                                            input:
                                                'la-unclear-modal-search__box',
                                            results: 'la-unclear-modal-results',
                                            listItem:
                                                'la-unclear-modal-results__item'
                                        }}
                                        onOptionSelected={keyword => {
                                            this.setState(
                                                {
                                                    keyword
                                                },
                                                this.onSearch
                                            );
                                        }}
                                        maxVisible={2}
                                    />
                                    <Button
                                        className="la-unclear-modal-search__button"
                                        size="tiny"
                                        color="green"
                                        onClick={() => {
                                            this.getInputValue(
                                                true,
                                                this.inputValueRef
                                            );
                                        }}
                                    >
                                        Search
                                    </Button>
                                </div>
                                <Header>Top keywords:</Header>
                                <div className="la-unclear-modal-tags">
                                    {this.props.keywords.map(
                                        (keyword: string, index: number) => (
                                            <Label
                                                key={index}
                                                className="la-unclear-modal-tags__tag"
                                                onClick={_ => {
                                                    this.setState(
                                                        {
                                                            keyword
                                                        },
                                                        this.onSearch
                                                    );
                                                }}
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
