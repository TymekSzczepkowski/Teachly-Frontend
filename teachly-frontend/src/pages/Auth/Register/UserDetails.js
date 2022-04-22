import React from "react";

function UserDetails() {
  return (
    <div>
      <div>
        <div>Załóż konto</div>
        <form>
          <div>
            <input placeholder='Adres email'></input>
          </div>
          <div>
            <input placeholder='Hasło'></input>
          </div>
          <div>
            <input placeholder='Powtórz hasło'></input>
          </div>
          <div>
            <button>Kontynuuj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
