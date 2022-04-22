import React from "react";

function UserDetails() {
  return (
    <div>
      <div>
        <div>Załóż konto</div>
        <form>
          <div>
            <input placeholder='Imię'></input>
          </div>
          <div>
            <input placeholder='Nazwisko'></input>
          </div>
          <div>
            <input placeholder='Kraj'></input>
          </div>
          <div>
            <input placeholder='Województwo'></input>
          </div>
          <div>
            <input placeholder='Miasto'></input>
          </div>
          <div>
            <button>Kontynuuj</button>
            <button>Powrót</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
