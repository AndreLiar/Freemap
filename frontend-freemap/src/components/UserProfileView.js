import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import calling_illustration from '../assets/calling_illustration.png'
import MapCard from './MapCard'
import CallUser from './CallUser'

function UserProfileView({ result }) {
  return (
      <section className="container ">
          <div className="modal fade modal-xl " id="profilModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                      <div className="modal-header">

                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                            
                          <div className="row ">
                              <div className="col" >
                                  <div >

                                  <div className='  w-100 d-flex align-items-center  shadow p-5'> 
                                      <img
                                          src={result.profilePhoto}
                                          alt="Profile"
                                          className="img-fluid rounded-circle mb-2"
                                          style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                      />
                                      <h6 id="exampleModalLabel" className='ms-2'>{result.name} 
                                        {result.certified && (
                                                  <BsCheckCircleFill
                                                    className="text-primary ms-2"
                                                    title="Compte certifié"
                                                    style={{ fontSize: "1.2rem" }}
                                                  />
                                                )}
                                        </h6>
                                  </div>
                                  <div className='p-5  mt-3  w-100 row shadow ms-1'>
                                    <div className='col'>
                                          <p className='d-block'>
                                                  <h6 className='text-secondary'>Spécialisation :</h6>
                                               {result.specialization}
                                          </p>
                                          <p>
                                                  <h6 className='text-secondary'>Taux horaire:</h6> {result.hourlyRate} €/h
                                          </p>
                                    </div>
                                    <div className='col'>
                                         <p>
                                            <h6 className='text-secondary'>Siret:</h6>{result.siret}
                                         </p>
                                          <p>
                                                  <h6 className='text-secondary'>description:</h6> {result.description}
                                          </p>
                                    </div>
                                     
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                  <div style={{ height: "75%" }}className='px-5 ' >
                                      <img
                                          src={calling_illustration}
                                          alt="calling-illustration"
                                          className="img-fluid "
                                            style={{ width: "100%", height: "100%", }}
                                          
                                      />
                                    <CallUser userId={result.uid} />
                                </div>
                               

                              </div>
                          </div>
                          <div className="">
                              <MapCard lat={result.location.lat} lng={result.location.lng} address={result.location.address} />
                            </div>
                      </div>
                  </div>
              </div>
          </div>

      </section>
  )
}

export default UserProfileView