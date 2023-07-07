import Draggable from 'react-draggable';

const CustomComponent = ({ text }) => {
  return (
    <Draggable>
      <div style={{ cursor: 'move' }}>
        {text}
      </div>
    </Draggable>
  );
};

export default CustomComponent;