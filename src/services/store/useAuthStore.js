import { create } from "zustand";

const useAuthStore = create((set)=>({
    user:null,
    loginState:null,
    signupState:null,
    signoutState:null,
    setUser:(value) => set ({user: value}),
    setLoginState:(value) => set({loginState: value}),
    setSignupState:(value) => set({signupState: value}),
    setSignoutState:(value) => set({signoutState: value})
}))
export default useAuthStore