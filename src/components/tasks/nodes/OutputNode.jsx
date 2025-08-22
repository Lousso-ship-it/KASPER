import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";

export default function OutputNode({ data }) {
  return (
    <div className="p-4 rounded-lg bg-green-600/20 border border-green-500/30 text-white">
      <Handle type="target" position={Position.Left} />
      {data.label || "Output"}
    </div>
  );
}

OutputNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }),
};
