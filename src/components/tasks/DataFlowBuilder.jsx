import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";

export default function DataFlowBuilder({ value, onChange }) {
  const initialNodes = value?.nodes?.length
    ? value.nodes
    : [
        {
          id: "source",
          type: "input",
          position: { x: 0, y: 0 },
          data: { label: "Source" }
        },
        {
          id: "output",
          type: "output",
          position: { x: 400, y: 0 },
          data: { label: "Sortie" }
        }
      ];
  const initialEdges = value?.edges || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) =>
    setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    onChange?.({ nodes, edges });
  }, [nodes, edges, onChange]);

  const addStep = () => {
    const id = `step_${nodes.length + 1}`;
    const newNode = {
      id,
      position: { x: Math.random() * 400, y: 100 + Math.random() * 200 },
      data: { label: `Étape ${nodes.length - 1}` }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="space-y-2">
      <div className="h-64 bg-[#1a1a1a] border border-[#3a3a3a] rounded">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} color="#444" />
        </ReactFlow>
      </div>
      <Button type="button" onClick={addStep} className="tactical-button">
        Ajouter une étape
      </Button>
    </div>
  );
}
