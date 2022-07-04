const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      username: "",
      password: "",
      error: null,
      isAuth: false,
      currentUser: [],
      profile: null
    },
    actions: {
      isAuthenticated: () => {
        //console.log("verificanco usuario");
        if (sessionStorage.getItem("isAuth")) {
          setStore({
            isAuth: sessionStorage.getItem("isAuth"),
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },

      handleChange : e => {
        setStore({
          [e.target.name]: e.target.value
        })
      },
      handleSubmit: async (e, history) =>{
        e.preventDefault();
        try {
          const { username, password } = getStore();
          const data = { username: username, password: password }
          //console.log(data);
          const resp = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              } 
          });
          const infoUser = await resp.json();
          if (infoUser.msg) {
            setStore({
              password: "",
              error: infoUser.msg,
            });
          } else {
            setStore({
              username: "",
              password: "",
              error: null,
              currentUser: infoUser,
              isAuth: true,
            });
            sessionStorage.setItem('isAuth', true);
            sessionStorage.setItem('currentUser', JSON.stringify(infoUser));
            history.push("/profile");
          }
        } catch (error) {
          setStore({
            error: error.message
          });
        
        }

      },

      register: (datos) => { //datos 
        fetch("http://127.0.0.1:5000/api/register", {
          method: "POST",
          headers: { "Content-type" : "application/json"},
          body: JSON.stringify(datos), //datos
        })
          .then((resp) => resp.json())
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      },

     
      getProfile: () => {
        const { currentUser} = getStore();
        const {access_token}=currentUser;
        //console.log(access_token)
        fetch("http://127.0.0.1:5000/api/profile", {
          method: 'GET',
          headers: {
            'Conten-Type': 'application/json',
            "Authorization":`Bearer ${currentUser.access_token}`
            //'Authorization': 'Bearer' + currentUser?.access_token
          }
        })
          .then(resp => resp.json())
          .then(datos =>{
            console.log(datos) //datos
            setStore({
              profile:datos //datos
            })    
          })
          .catch(error => console.log(error));
      },
      logout:(history)=>{
        sessionStorage.clear()
        setStore({isAuth:false, currentUser:[]})
  
        history.push("/")
  
      },
    },
  };
  
};
export default getState;
