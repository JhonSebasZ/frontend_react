export interface User{
    userId:number;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    address:string;
    password:string
}

export interface UserContextState{
    users:User[];
    logged:boolean;
    currentUser:User;
    modal:boolean;
    currentTab:string;
    addUser:(user:User) => void;
    updateUser:(id:number) => void;
    removeUser:(id:number) => void;
    loginUser:(user:User) => void;
    logoutUser:() => void;
    updateCurrentUser:(user:User) => void;
    updateAccountTab:() => void;
    displayModal:(b:boolean) => void;
} 