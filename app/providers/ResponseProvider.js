'use client'
import {useState} from 'react';

import { ResponseContext } from '../contexts';

export default function ResponseProvider({children}) {
    const [myText, setMyText] = useState("");
    const [products, setProducts] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [inputOuputPair, setInputOutputPair] = useState([]);

    return(
        <ResponseContext.Provider value={{myText,setMyText,aiResponse,setAiResponse,inputOuputPair, setInputOutputPair, products, setProducts}}>
            {children}
        </ResponseContext.Provider>
    )
}