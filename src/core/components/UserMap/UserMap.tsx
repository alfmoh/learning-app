import * as React from 'react';
import { Graph } from 'react-d3-graph';
import { Neo4jService } from '../../../services/Neo4j.service';
import LaLoader from '../../../shared/components/Loader';

class UserMap extends React.Component<any, any> {
    state = {
        data: {}
    };
    graphConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 120,
            highlightStrokeColor: 'blue'
        },
        link: {
            highlightColor: 'lightblue'
        },
        directed: true
    };
    componentDidMount() {
        const neo4jService = new Neo4jService();
        neo4jService.getGraphData().then(data => {
            this.setState({
                data
            });
        });
    }
    public render() {
        return (
            <div>
                {Object.keys(this.state?.data).length ? (
                    <Graph
                        id="graph-id"
                        data={this.state.data}
                        config={this.graphConfig}
                        onClickNode={(...node) => {
                            console.log(node);
                        }}
                    />
                ) : (
                    <LaLoader />
                )}
            </div>
        );
    }
}

export default UserMap;
