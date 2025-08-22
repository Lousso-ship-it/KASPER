import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls
} from "reactflow";
import 'reactflow/dist/style.css';
import SourceNode from "./nodes/SourceNode";
import TransformNode from "./nodes/TransformNode";
import OutputNode from "./nodes/OutputNode";

const nodeTypes = {
  source: SourceNode,
  transform: TransformNode,
  output: OutputNode
};

export default function PipelineBuilder({ value, onChange }) {
  const onNodesChange = useCallback(
    (changes) => onChange({ ...value, nodes: applyNodeChanges(changes, value.nodes) }),
    [value, onChange]
  );

  const onEdgesChange = useCallback(
    (changes) => onChange({ ...value, edges: applyEdgeChanges(changes, value.edges) }),
    [value, onChange]
  );

  const onConnect = useCallback(
    (connection) => onChange({ ...value, edges: addEdge(connection, value.edges) }),
    [value, onChange]
  );

  return (
    <div className="h-64 bg-[#1a1a1a] border border-[#3a3a3a] rounded"> 
      <ReactFlow
        nodes={value.nodes}
        edges={value.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
