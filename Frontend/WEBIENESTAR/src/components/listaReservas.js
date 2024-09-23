import React from "react";
import "./listaReservas.css";

const ListaReservas = () => {
  return (
    <body>
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
        integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY="
        crossorigin="anonymous"
      />

      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="career-search mb-60">
              <form action="#" class="career-form mb-60">
                <div class="row">
                  <div class="col-md-6 col-lg-3 my-3">
                    <div class="input-group position-relative">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Buscar por DNI"
                        id="keywords"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 my-3">
                    <div class="select-container">
                      <select class="custom-select">
                        <option selected="">Tipo de Menu</option>
                        <option value="1">Clasico</option>
                        <option value="2">Saludable</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 my-3">
                    <div class="select-container">
                      <select class="custom-select">
                        <option selected="">Tipo de reserva</option>
                        <option value="1">Retiro</option>
                        <option value="2">Consumo en el local</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-3 my-3">
                    <button
                      type="button"
                      class="btn btn-lg btn-block btn-light btn-custom"
                      id="contact-submit"
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </form>

              <div class="filter-result">
                <p class="mb-30 ff-montserrat">Total de reservas: 150</p>

                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                  <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                      DG
                    </div>
                    <div class="job-content">
                      <h5 class="text-center text-md-left">
                        Denise Agostina Geraldine Diaz
                      </h5>
                      <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-pin mr-2"></i> Clasico
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-money mr-2"></i> Becario
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-time mr-2"></i> Retiro
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="job-right my-4 flex-shrink-0">
                    <a
                      href="#"
                      class="btn d-block w-100 d-sm-inline-block btn-light"
                    >
                      Marcar como entregada
                    </a>
                  </div>
                </div>

                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                  <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                      LF
                    </div>
                    <div class="job-content">
                      <h5 class="text-center text-md-left">
                        Maria Luciana Figueroa
                      </h5>
                      <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-pin mr-2"></i> Clasico
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-money mr-2"></i> Becario
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-time mr-2"></i> Retiro
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="job-right my-4 flex-shrink-0">
                    <a
                      href="#"
                      class="btn d-block w-100 d-sm-inline-block btn-light"
                    >
                      Marcar como entregada
                    </a>
                  </div>
                </div>

                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                  <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                      NT
                    </div>
                    <div class="job-content">
                      <h5 class="text-center text-md-left">
                        Juan Ignacio Nicolas Torres
                      </h5>
                      <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-pin mr-2"></i> Saludable
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-money mr-2"></i> No Becario
                        </li>
                        <li class="mr-md-4">
                          <i class="zmdi zmdi-time mr-2"></i> Consumo en el local
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="job-right my-4 flex-shrink-0">
                    <a
                      href="#"
                      class="btn d-block w-100 d-sm-inline-block btn-light"
                    >
                      Marcar como entregada
                    </a>
                  </div>
                </div>

                </div>
            </div>
            <nav aria-label="Page navigation">
              <ul class="pagination pagination-reset justify-content-center">
                <li class="page-item disabled">
                  <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    <i class="zmdi zmdi-long-arrow-left"></i>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item d-none d-md-inline-block">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item d-none d-md-inline-block">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    ...
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    8
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="zmdi zmdi-long-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ListaReservas;
