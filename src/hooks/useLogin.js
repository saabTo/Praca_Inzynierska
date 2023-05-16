
import { useState } from "react";                                 //Import hooków useState oraz useAuthContext
import { useAuthContext } from "./useAuthContext";

                                                          
export const useLogin = () =>{                                  //Utworzenie hooka useLogin
                                                                //Definicje dwóch zmiennych stanu
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    
    
    const login = async (email, password) =>{                   //Funkcja 'login' z użyciem async/await
       
        setIsLoading(true);                                     //Ustawienie stanu isLoading na true 
        setError(null);                                         //Wyczyszczenie stanu error

        
        const response = await fetch('/api/user/login',{        //Wysłanie zapytania do serwera z użyciem funkcji fetch
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        
        const json = await response.json();                     //Konwersja odpowiedzi serwera na format JSON
       
        if(!response.ok || response === undefined)              //Sprawdzenie odpowiedzi serwera
        {
            setIsLoading(false);
            setError(json.error);
        }
       
        if(response.ok)                                         //Jeśli odpowiedź serwera jest poprawna
        {
           
            sessionStorage.setItem('user', JSON.stringify(json));//Zapisanie danych użytkownika w sessionStorage
            dispatch({type: 'LOGIN', payload: json});           //Wywołanie funkcji dispatch 
            setIsLoading(false);
        }
    }
    return {login, isLoading, error}                            //Zwrócenie wartości - funkcję login, zmienną isLoading oraz zmienną error
}