import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default function SourceNode({ data }) {
  return (
    <div className="p-4 rounded-lg bg-blue-600/20 border border-blue-500/30 text-white">
      {data.label || "Source"}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

SourceNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }),
};
