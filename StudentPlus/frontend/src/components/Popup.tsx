const Popup = ({ setIsOpenPopup, children }: any) => {
  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: 'blur(3px)',
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
          width: "90%",
          maxWidth: "500px",
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
