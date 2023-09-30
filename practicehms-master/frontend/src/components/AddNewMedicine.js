import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";

export default function AddNewMedicine() {
    const navigate = useNavigate();

    const [mName, setmName] = useState("");
    const [uPrice, setuPrice] = useState("");
    const [qty, setqty] = useState("");
    const [errors, setErrors] = useState({});

    function validateForm() {
        const errors = {};

        if (!mName.trim()) {
            errors.mName = "Medicine Name is required";
        }

        if (!uPrice.trim()) {
            errors.uPrice = "Unit Price is required";
        } else if (isNaN(uPrice)) {
            errors.uPrice = "Unit Price must be a number";
        }

        if (!qty.trim()) {
            errors.qty = "Quantity is required";
        } else if (isNaN(qty)) {
            errors.qty = "Quantity must be a number";
        }

        return errors;
    }

    function btnClick(e) {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // No validation errors, proceed with the form submission
            // const formData = new FormData();
            // formData.append("mName", mName);
            // formData.append("uPrice", uPrice);
            // formData.append("qty", qty);
            const formData = {
                mName: mName,
                uPrice: uPrice,
                qty: qty
            };
            

            axios
                .post("http://localhost:8050/med/add", formData)
                .then(function () {
                    alert("Success!!");
                    navigate("/readMedicine"); // navigate to medicine page after successful addition of medicine
                })
                .catch(function (err) {
                    alert(err);
                });
        } else {
            // Validation errors found, update the state to display error messages
            setErrors(errors);
        }
    }

    function cancel(e) {
        e.preventDefault();
        navigate("/addNewMedicine");
        window.location.reload()
    }

    return (

        <div>

            <div>

                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>
            <div style={{


                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',
                paddingTop: '100px'



            }}>
                <form
                    name="Addform"
                    method="post"
                    encType="multipart/form-data"
                    className="container was-validated"
                    style={{


                        backgroundColor: "#bbbdbb",
                        borderRadius: "10px",
                        opacity: "0.85",

                    }}
                >
                    <br />

                    <h3 className="text-primary">
                        <b>Add New Medicine</b>
                    </h3>

                    <div class="row d-flex justify-content-center">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="mName">
                                <b>Medicine Name</b>
                            </label>
                            <input
                                name="mName"
                                type="text"
                                className="form-control"
                                id="mName"
                                placeholder="Medicine Name"
                                onChange={function (e) { setmName(e.target.value); }}
                                required
                            />
                        </div>
                        <br />
                        <br />

                    </div>

                    <div class="row d-flex justify-content-center">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="uPrice">
                                <b>Unit Price</b>
                            </label>
                            <input
                                name="uPrice"
                                type="Number"
                                className="form-control"
                                id="uPrice"
                                placeholder="Unit Price"
                                onChange={function (e) { setuPrice(e.target.value); }}
                                required
                            />
                        </div>
                        <br />
                    </div>

                    <div class="row d-flex justify-content-center">
                        <div className="form-group col-md-6 mt-3 mt-md-0">
                            <label for="qty">
                                <b>Quantity</b>
                            </label>
                            <input
                                name="qty"
                                type="Number"
                                className="form-control"
                                id="qty"
                                placeholder="Quantity"
                                onChange={function (e) { setqty(e.target.value); }}
                                required
                            />
                        </div>
                        <br />
                    </div>
                    <br />

                    <div class="row d-flex justify-content-center">


                        <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={btnClick}>Submit</button><br />



                    </div><br />

                    <div class="row d-flex justify-content-center">

                        <button className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" onClick={cancel} style={{marginLeft:"48px"}}>Cancel</button>

                    </div><br />


                </form><br /><br />

                <a href="/readMedicine"><button className="btn btn-danger col-md-4 mt-0 mt-md-0 mr-5" style={{ backgroundColor: "#0297BF", border: "none" }}>Inventory</button></a>


            </div>

        </div>
    );
}