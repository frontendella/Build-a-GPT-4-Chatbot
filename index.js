import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')
 
const conversationArr = [
    {
        role: 'system',
        content: 'You are a highly knowledgeable assistant that is always happy to help.'
    }
] 
 
document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')   
    conversationArr.push({ 
        role: 'user',
        content: userInput.value
    })
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})

async function fetchReply(){
    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: conversationArr
/*
Challenge:
1. Give this object a 'model' property of 'gpt-4'.
2. Give it a 'messages' property, which should hold 
   our const conversationArr.
3. Ask a question, hit send, and log out the response to 
   see if it works.
*/  
    })
    console.log(response)
}

// {data: {id: "chatcmpl-76eTRB8SX9ZFfbExfCxS9HGsJYZ3S", object: "chat.completion", created: 1681819905, model: "gpt-4-0314", usage: {prompt_tokens: 31, completion_tokens: 7, total_tokens: 38}, choices: [{message: {role: "assistant", content: "The capital of Tunisia is Tunis."}, finish_reason: "stop", index: 0}]}, status: 200, statusText: "", headers: {cache-control: "no-cache, must-revalidate", content-type: "application/json"}, config: {transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}, adapter: xhrAdapter(e), transformRequest: [transformRequest(e,t)], transformResponse: [transformResponse(e)], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, validateStatus: validateStatus(e), headers: {Accept: "application/json, text/plain, */*", Content-Type: "application/json", User-Agent: "OpenAI/NodeJS/3.2.1", Authorization: "Bearer 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"}, method: "post", data: "{"model":"gpt-4","messages":[{"role":"system","content":"You are a highly knowledgeable assistant that is always happy to help."},{"role":"user","content":"What is the capital of Tunisia?"}]}", url: "https://api.openai.com/v1/chat/completions"}, request: XMLHttpRequest {}}


function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}