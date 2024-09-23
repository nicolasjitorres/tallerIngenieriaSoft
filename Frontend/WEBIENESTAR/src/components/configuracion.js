import React from "react";
import "./configuracion.css";

const Configuracion = () => {
  return (
    <div className="container">
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css'></link>
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      src={`${process.env.PUBLIC_URL}/chicas.png`}
                      alt="Geraldine Diaz"
                      className="rounded-circle"
                    />
                  </div>
                  <h5 className="user-name">Denise Agostina Geraldine Diaz</h5>
                  <h6 className="user-email">dgeraldineuniversidad@gmail.com</h6>
                </div>
                <div className="about">
                  <h5>¡Bienvenida!</h5>
                  <p>
                    Aquí podrás visualizar y modificar algunos de tus datos personales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-primary">Datos personales</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="fullName">Nombre y Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Denise Agostina Geraldine Diaz"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      placeholder="dgeraldineuniversidad@gmail.com"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="3856193862"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="website">Dirección</label>
                    <input
                      type="url"
                      className="form-control"
                      id="website"
                      placeholder="Cordoba Norte 83"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mt-3 mb-2 text-primary">Datos Académicos</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="facultad">Facultad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="facultad"
                      placeholder="FCEyT"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="carrera">Carrera</label>
                    <input
                      type="text"
                      className="form-control"
                      id="carrera"
                      placeholder="Licenciatura en Sistemas de Información"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="button-container">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
