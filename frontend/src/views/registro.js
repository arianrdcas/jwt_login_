import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'


export const Registro = props => {
    
    const{actions}=useContext(Context)

    const [datos, setDatos] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        //console.log(e.target.username)
        //console.log(e.target.password)
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const enviarDatos = (e) => {
        e.preventDefault()
        console.log('enviando datos...' + datos.username + ' ' + datos.password)
        actions.register(datos)
        setDatos({
            username:"",
            password:""
        })
    }

    

    return (
        <>
            <h1 className="m-3">Bienvenido, regístrese !!!</h1>
            <form className="mx-auto my-5" onSubmit={enviarDatos} style={{ width: "50%" }} method="post">
                <input
                type="text"
                name="username"
                className="form-control my-2"
                placeholder="Ingrese email"
                onChange={handleInputChange}
                autoComplete="off"
                value={datos.username}
                 
                />
                <input
                type="password"
                name="password"
                className="form-control mb-4"
                placeholder="Ingrese contraseña"
                onChange={handleInputChange}
                autoComplete="off"
                value={datos.password}
                
                />
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-info btn-block btn-sm">
                        Registrarse
                    </button>
                </div>
            </form>
             {/* <ul>
                <li>{datos.email}</li>
                <li>{datos.password}</li>
            </ul> */}
        </>    
    )
}