import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/helper'

const searchPossibleWords = (language, grid, attempts) => {
    const greyLetters = []
    const yellowLetters = []
    const greenLetters = ["_", "_", "_", "_", "_"]
    for(let i = 0; i < attempts; i++ ){
        const word = grid[i]
        const letterColors = word.colors.split("")
        const chars = word.letters.split("")
        letterColors.forEach((letterColor, index) => {
            if(letterColor === "n" && !greyLetters.includes(chars[index])){
                greyLetters.push(chars[index])
            }
            if(letterColor === "y"){
                yellowLetters.push(index.toString())
                yellowLetters.push(chars[index])
            }
            if(letterColor === "g"){
                greenLetters[index] = chars[index]
            }
        })
    }
    
    const url = baseUrl + "/words?language=" + language + "&grey=" + greyLetters.join("") + "&yellow=" + yellowLetters.join("") + "&green=" + greenLetters.join("")
    const request = axios.get(url, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const helperService = {
    searchPossibleWords,
  }

export default helperService