export default function emailVerification(state) {
  return () => {
    if (state.email === "") {
      console.log("Please enter Email");
      return false;
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      return true;
    }
    console.log("You have entered an invalid email address!");
    return false;
  };
}
