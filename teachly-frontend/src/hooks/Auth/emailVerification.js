export default function emailVerification(state, errorInfo, setErrorInfo) {
  return () => {
    if (state.email === "") {
      setErrorInfo({ ...errorInfo, emailError: "Proszę podać email" });
      return false;
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      return true;
    }
    setErrorInfo({ ...errorInfo, emailError: "Email jest niepoprawny" });
    return false;
  };
}
