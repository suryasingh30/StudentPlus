const LoginPopup = ({ setIsSigninupPop, children }: any) => {
  return (
    <div
      onClick={() => setIsSigninupPop(false)}
      style={{
        position: 'fixed',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(3px)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
        <div>{children}</div>
    </div>
  );
};

export default LoginPopup;
