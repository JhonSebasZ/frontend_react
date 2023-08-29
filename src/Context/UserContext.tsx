import React from 'react'
import { useState } from 'react'
import { User,UserContextState } from '../Types/User'

interface ProviderProps{
    children:React.ReactNode;
}

//Se crea el contecto para el estado del usuario
export const Context = React.createContext<UserContextState | null>(null);

export const UserProvider:React.FC<ProviderProps> = ({children}) => {
    //Listado de usuarios
    const [users, setUsers] = useState<User[]>([]);
    //Inicio de session
    const [logged, setLogged] = useState<boolean>(false);
    //pestaña actual
    const [currentTab, setCurrentTap] = useState<string>('1');
    // manejo de modal
    const [modal, setModal] = useState<boolean>(false);
    //usuario actual
    const [currentUser, setCurrentUser] = useState<User>({
        userId:0,
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        address:'',
        password:''
    });

    const addUser = (user:User) => {
        const newUser:User = {
            userId:Math.floor(Math.random() * 1000)+1,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            address:user.address,
            password:user.password
        };

        setUsers([...users, newUser])
    };

    const updateUser = (id:number) => {
        users.filter((user:User) => {
            if(user.userId === id){
                setUsers([...users]);
            }
        });
    };

    const removeUser = (id:number) => {
        //agrega los que no esten en el filtro
        setUsers(users.filter((user:User) => user.userId !== id));
    };

    const loginUser = (user:User) => {
        setLogged(true);
        setCurrentUser(user);
    }

    const logoutUser = () => {
        setLogged(false);
        setCurrentUser({
            userId:0,
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            address:'',
            password:''
        });
    };

    const updateCurrentUser = (user:User) => {
        setCurrentUser(user);
    };

    //actualizar la pestaña de la cuenta del usuario
    const updateAccountTab = () => {
        if(currentTab === '1'){
            setCurrentTap('2');
        }else{
            setCurrentTap('1');
        }
    };

    const displayModal = (b:boolean) =>{
        setModal(b);
    };

    return(
        <Context.Provider 
        value={{
            users, 
            addUser, 
            updateUser, 
            removeUser,
            currentTab,
            updateAccountTab,
            logged,
            loginUser,
            logoutUser,
            currentUser,
            updateCurrentUser,
            displayModal,
            modal
            }}
        >
            {children}
        </Context.Provider>
    );
}