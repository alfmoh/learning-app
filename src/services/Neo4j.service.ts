import neo4j, { Driver, Session, QueryResult, Node } from 'neo4j-driver';
import { WebService } from './Web.service';

export class Neo4jService extends WebService<any> {
    driver: Driver;
    session: Session;
    constructor() {
        super();
        this.driver = neo4j.driver(
            'bolt://localhost:7687',
            neo4j.auth.basic('neo4j', 'Aneo4jj')
        );
        this.session = this.driver.session();
    }

    getGraphData() {
        return this.session
            .run(
                `MATCH (a:Category {name:'Concepts in physics'})-[r]-(b) RETURN r, a, b`
            )
            .then((queryResult: QueryResult) => {
                const nestedNodes = this.getNodes(queryResult);
                // const relationships = this.getRelationships(result);
                const nodes = this.flatten(nestedNodes);
                const links = nestedNodes.map(nodeSet => {
                    return {
                        source: nodeSet[0].id,
                        target: nodeSet[1].id,
                        sourceNode: nodeSet[0],
                        targetNode: nodeSet[1]
                    };
                });
                this.session.close();
                return { nodes, links };
            })
            .catch(console.log);
    }

    private flatten(arr: any[]): any[] {
        return arr.reduce(
            (flat: any[], next: any) =>
                flat.concat(Array.isArray(next) ? this.flatten(next) : next),
            []
        );
    }
    // getRelationships(result: QueryResult) {
    //     return this.filter(result, '__isRelationship__');
    // }

    private getNodes(result: QueryResult) {
        let nodes = this.filter(result, '__isNode__');
        return nodes.map(nodes => {
            const res = [];
            nodes.forEach(node => {
                node.id = node.properties.name;
                res.push(node);
            });
            return res;
        });
    }

    private filter(result: QueryResult, filterName: string) {
        return result.records.map((record: any) =>
            record._fields.filter((rec: any) => rec[filterName])
        );
    }
}
