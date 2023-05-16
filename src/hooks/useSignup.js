
import { useState } from "react";                                       //Import hooków 
import { useAuthContext } from "./useAuthContext";


export const useSignup = () =>{                                        //Utworzenie hooka useSignup
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    
    const signup = async (email, password,confirmPassword) =>{         //Utworzenie funkcji signup z użyciem async/await
        setIsLoading(true); 
        setError(null);
        
        const response = await fetch('/api/user/signup',{              //Wysłanie zapytania do serwera za pomocą funkcji fetch
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password,confirmPassword})
        });
       
        const json = await response.json();                             //Konwersja odpowiedzi serwera na format JSON
        
        if(!response.ok)                                                //Obsługa błędów 
        {
            setIsLoading(false);
            setError(json.error);
        }
       
        if(response.ok)                                                 //Jeśli odpowiedź serwera jest poprawna, dane zostaną zapisane w sessionStorage
                                                                        //akcja logowania zostanie przekazana do useAuthContext
        {
            sessionStorage.setItem('user', JSON.stringify(json)); 
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }

    }
    return {signup, isLoading, error}                                   //Zwrócenie funkcji signup oraz stanów isLoading i error
}