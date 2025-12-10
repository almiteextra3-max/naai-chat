const API_KEY = "YOUR_OPENAI_API_KEY";

function addMessage(t, type){
    let box = document.createElement("div");
    box.className = "msg " + type;
    box.innerText = t;
    document.getElementById("messages").appendChild(box);
    box.scrollIntoView();
}

async function sendMsg(){
    let input = document.getElementById("txt");
    let text = input.value.trim();
    if(!text) return;

    addMessage(text, "user");
    input.value = "";

    addMessage("Typing…", "ai");

    let res = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + API_KEY
        },
        body:JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{role:"user", content:text}]
        })
    });

    let data = await res.json();
    document.querySelectorAll(".ai")[document.querySelectorAll(".ai").length-1].remove();
    addMessage(data.choices[0].message.content, "ai");
}
