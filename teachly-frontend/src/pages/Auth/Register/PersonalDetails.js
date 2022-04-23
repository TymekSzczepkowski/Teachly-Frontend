import React from "react";

function PersonalDetails({ nextStep, previousStep, step, state, setState }) {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    previousStep();
  };
  return (
    <div>
      <div>
        <div>Krok {step}-4</div>
        <div>Załóż konto</div>
        <form>
          <div>
            <input
              placeholder='Imię'
              value={state.firstName}
              onChange={(e) => {
                setState({ ...state, firstName: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Nazwisko'
              value={state.lastName}
              onChange={(e) => {
                setState({ ...state, lastName: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Kraj'
              value={state.country}
              onChange={(e) => {
                setState({ ...state, country: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Województwo'
              value={state.region}
              onChange={(e) => {
                setState({ ...state, region: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Miasto'
              value={state.city}
              onChange={(e) => {
                setState({ ...state, city: e.target.value });
              }}></input>
          </div>
          <div>  
            <select name="gender">
              <option value='' selected disabled hidden>Wybierz płeć</option> 
              <option value="female">Kobieta</option>
              <option value="male">Mężczyzna</option>
              <option value="other">Inna</option>
            </select>
          </div>
          <div>
            <button onClick={Previous}>Powrót</button>
            <button onClick={Continue}>Kontynuuj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select> */
}
export default PersonalDetails;
