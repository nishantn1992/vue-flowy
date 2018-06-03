import debug from 'debug';
const log = debug('normalizer');
export default class Normalizer {
    constructor(graph) {
        this.graph = graph;
    }
    normalize() {
        this.graph.dummyChain = [];
        log('EDGES', this.graph.edges);
        this.graph.edges.forEach(this._normalizeEdge, this);
    }
    _normalizeEdge(edge) {
        if (edge.to.rank === edge.from.rank + 1) {
            return;
        }
        for (let i = edge.from.rank + 1; i < edge.to.rank; i++) {
            edge.points = [];
            let dummy = this.graph.addDummyNode('edge', { rank: edge.from.rank }, '_d');
            this.graph.setEdge(edge.from.id, dummy.id, {
                weight: edge.weight
            });
            if (i === edge.from.rank + 1) {
                this.graph.dummyChain.push(dummy);
            }
        }
    }
}
//# sourceMappingURL=Normalizer.js.map