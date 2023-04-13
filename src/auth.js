import { createContext,useContext } from "react";

export let AuthContext = createContext(null);
//     {
//         fname:null,
//         phonNumber:null,
//         userId:null,
//         Location:null,
//         setAuthToken:(data)=>{},
//         setphonNumber:(data)=>{},
//         setuserId:(data)=>{},
//         setfname:(data)=>{}
//     }
// );

// export function useAuthContext(){
//     return useContext(authContext);
// }