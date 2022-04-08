import { Vertex } from './vertex';

type Value = number | string;

export class Graph {
  directed: boolean;
  // Adjacency list
  vertices: Vertex[] = [];

  constructor(directed = false) {
    this.directed = directed;
  }

  addVertex(value: Value) {
    const vertex = new Vertex(value);
    this.vertices.push(vertex);

    return vertex;
  }

  #getVertex(value: Value) {
    return this.vertices.find((vertex) => vertex.value === value);
  }

  addEdge(value1: Value, value2: Value) {
    let v1 = this.#getVertex(value1);
    let v2 = this.#getVertex(value2);

    if (v1 === undefined) {
      v1 = this.addVertex(value1);
    }

    if (v2 === undefined) {
      v2 = this.addVertex(value2);
    }

    v1.edges.push(v2);

    if (!this.directed) {
      v2.edges.push(v1);
    }
  }

  toString() {
    let str = `\n`;

    for (const vertex of this.vertices) {
      str += `${vertex.value} ${this.directed ? '->' : '--'} `;

      for (const edge of vertex.edges) {
        str += `${edge.value} `;
      }

      str += `\n`;
    }

    return str;
  }
}
