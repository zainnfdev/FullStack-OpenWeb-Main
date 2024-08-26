Exercise 
0.4 : New note diagram
- Creating a diagram depicting the situation where the user creates a new note on the page 

``` mermaid 
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    
    Note right of browser: The browser send the user input to the server via a HTML document
    
    server-->>browser: HTML document
    deactivate server
    
    Note left of server: The server asks the browser to do a new HTTP GET request
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"כסע","date":"2023-04-30T14:10:17.724Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

Exercise 
0.5 : Single page app diagram
- Creating a diagram depicting the situation where the user goes to the single-page app version of the notes app 

``` mermaid 
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"sdfg","date":"2023-04-30T14:06:04.060Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

Exercise 
0.6 : New note in Single page app diagram
- Creating a diagram depicting the situation where the user creates a new note using the single-page version of the app

``` mermaid 
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    
    Note right of browser: {"content":"Testing SPA","date":"2023-05-01T03:36:21.445Z"}
    
    server-->>browser: Rerenders the note list on the page
    deactivate server

    Note right of browser: The event handler creates a new note, adds it to the notes list
    
    
```
