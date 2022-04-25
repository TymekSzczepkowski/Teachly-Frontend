export default function emailVerification(state, errorInfo, setErrorInfo) {
  return () => {
    if (state.email === "") {
      return "Proszę podać email";
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      return "";
    }
    return "Email jest niepoprawny";
  };
}
