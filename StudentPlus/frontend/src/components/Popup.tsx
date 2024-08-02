import { AiOutlineCloseSquare } from "react-icons/ai";

const Popup = ({ setIsOpenPopup, title, children }) => {
  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          // position: "relative",
          // background: "white",
          // borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          // padding: "20px 10px",
          // animation: "dropTop .3s linear",
          zIndex: 1000
        }}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
