import { AuthService } from './Auth.service';
import neo4j, { Driver, Session, QueryResult } from 'neo4j-driver';
import { WebService } from './Web.service';

export class Neo4jService extends WebService<any> {
    driver: Driver;
    session: Session;
    auth: AuthService;
    constructor() {
        super();
        this.driver = neo4j.driver(
            'bolt://localhost:7687',
            neo4j.auth.basic('neo4j', 'Aneo4jj')
        );
        this.session = this.driver.session();
        this.auth = new AuthService();
    }

    getGraphData() {
        return this.session
            .run(
                // `MATCH (a:Category {name:'Concepts in physics'})-[r]-(b) RETURN r, a, b`
                `MATCH (n)-[r]->(m) RETURN n,r,m`
            )
            .then((queryResult: QueryResult) => {
                console.log(queryResult);
                const nestedNodes = this.getNodes(queryResult);
                // const relationships = this.getRelationships(result);
                const nodes = this.flatten(nestedNodes);
                console.log(nodes);
                const links = nestedNodes.map(nodeSet => {
                    return {
                        source: nodeSet[0]?.id,
                        target: nodeSet[1]?.id,
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
                node.id = node.properties.name || node.properties.category;
                res.push(node);
            });
            return res;
        });
    }

    createNodes(nodes: string[]) {
        const userId = this.auth.getUser().nameid;
        const sessionsArr = [];
        if (nodes.length) {
            // const lastCategory = nodes[nodes.length - 1];
            const sessions = nodes.map(cat => {
                let session = this.driver.session();
                sessionsArr.push(session);
                return session.run(
                    `Match (n:Node)
                     Where n.category = '${cat}' 
                     Set n.userIds = case when ${userId} IN n.userIds then n.userIds else n.userIds + [${userId}] end
                     With count(n) as nodeChanged 
                     Where nodeChanged = 0 
                     Create(n:Node {userIds: [${userId}], category: '${cat}'})`
                );
            });
            Promise.all(sessions)
                .then(result => {
                    console.log(result);
                    if (sessionsArr.length) {
                        sessionsArr.forEach(session => session.close());
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (sessionsArr.length) {
                        sessionsArr.forEach(session => session.close());
                    }
                });
        }
    }

    private filter(result: QueryResult, filterName: string) {
        return result.records.map((record: any) =>
            record._fields.filter((rec: any) => rec[filterName])
        );
    }
}
