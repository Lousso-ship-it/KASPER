import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default function TransformNode({ data }) {
  return (
    <div className="p-4 rounded-lg bg-purple-600/20 border border-purple-500/30 text-white">
      <Handle type="target" position={Position.Left} />
      {data.label || "Transform"}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

TransformNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }),
};
