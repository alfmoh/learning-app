import { AuthService } from './Auth.service';
import neo4j, { Driver, Session, QueryResult } from 'neo4j-driver';
import { WebService } from './Web.service';

export class Neo4jService extends WebService<any> {
    driver: Driver;
    session: Session;
    auth: AuthService;
    childNodes = [];
    sessionsArr: any[];
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
                const nestedNodes = this.getNodes(queryResult);
                // const relationships = this.getRelationships(result);
                const nodes = this.flatten(nestedNodes);
                // console.log(nodes);
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
        this.sessionsArr = [];
        if (nodes.length) {
            if (this.childNodes.length) {
                const parentNodes = nodes
                    .concat(this.childNodes)
                    .map(x => x.toLocaleLowerCase())
                    .filter((x, i, arr) => arr.indexOf(x) === i)
                    .map(x => "'" + x + "'");
                const stringfyChildren = this.childNodes.map(
                    (x:string) => "'" + x.toLocaleLowerCase() + "'"
                );

                const categoryNodes = nodes.map(cat => {
                    let session = this.driver.session();

                    return session.run(
                        `Match (n:Node)
                     Where n.category = '${cat}' 
                     Set n.userIds = case when ${userId} IN n.userIds then n.userIds else n.userIds + [${userId}] end
                     With count(n) as nodeChanged 
                     Where nodeChanged = 0 
                     Create(n:Node {userIds: [${userId}], category: '${cat}'})`
                    );
                });

                const nodesLabel = () => {
                    const query = `
                Match(n:Node),(no:Node)
                With n, no
                Where n.category IN [${parentNodes}] and no.category IN [${stringfyChildren}]
                Set n:firstQuery
                Set no:secondQuery
               `;
                    return this.runQuery(query);
                };

                const nodesRelationship = () => {
                    const query = `
                Match p = (n:firstQuery), q = (nodd:secondQuery)
                Foreach(no in nodes(p) | 
                Foreach(nod in nodes(q)|
                Merge (nod)-[r:Relates_to]->(no)) 
               )
               `;
                    return this.runQuery(query);
                };

                const removeLabels = () => {
                    const query = `
                Match(n:Node)
                Remove n:firstQuery, n:secondQuery
                return n
               `;
                    return this.runQuery(query);
                };

                Promise.all(categoryNodes)
                    .then(nodesLabel)
                    .then(nodesRelationship)
                    .then(removeLabels)
                    .then(result => {
                        console.log(result);
                        this.closeSessions();
                    })
                    .catch(err => {
                        console.log(err);
                        this.closeSessions();
                    });
                this.childNodes = nodes;
            } else {
                this.childNodes = nodes;
            }
            console.log(nodes);
        }
    }

    private runQuery(query: string) {
        const session = this.driver.session();
        this.sessionsArr.push(session);
        return session.run(query);
    }

    private closeSessions() {
        if (this.sessionsArr.length) {
            this.sessionsArr.forEach(session => session.close());
        }
    }

    private filter(result: QueryResult, filterName: string) {
        return result.records.map((record: any) =>
            record._fields.filter((rec: any) => rec[filterName])
        );
    }
}
