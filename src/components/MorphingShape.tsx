const MorphingShape = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`morphing-container ${className}`}>
      <div className="morphing-shape-outline" />
    </div>
  );
};

export default MorphingShape;
