import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"

function Profile() {

    const [user,setUser] = useState(null)

    useEffect(() => {

        API.get("/users/profile")

        .then(res => setUser(res.data))

        .catch(console.error)

    },[])


    if(!user){

        return <h2>Loading...</h2>

    }


    return (

        <div className="container">

            <Navbar/>

            <h1>

                Customer Profile

            </h1>

            <div className="card">

                <h3>

                    Name

                </h3>

                <p>

                    {user.name}

                </p>

            </div>


            <div className="card">

                <h3>

                    Email

                </h3>

                <p>

                    {user.email}

                </p>

            </div>


            <div className="card">

                <h3>

                    Balance

                </h3>

                <p>

                    ₹ {user.balance}

                </p>

            </div>

        </div>

    )

}

export default Profile