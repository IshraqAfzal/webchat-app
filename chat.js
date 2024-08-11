function fetchMessage()
{
    fetch("chatmsg.php")
    .then(res => res.json())
    .then(data=>
    {
        document.getElementById("msgWindow").innerHTML = ""

        if (Array.isArray(data.messages))
        {
            arrMsg = data.messages
        } 
        else
        {
            arrMsg = []
        }

        arrMsg.forEach(msg => {
            textMsg = document.createElement("div")
            if (msg.person == username)
            {
                textMsg.classList.add("messageRight")
            }
            else
            {
                textMsg.classList.add("messageLeft")
            }
            textMsg.innerHTML = `<span><strong>${msg.person}</strong>&nbsp</span><span>${new Date(msg.time * 1000).toLocaleTimeString()}</span><p>${msg.message}</p>`
            document.getElementById("msgWindow").appendChild(textMsg)
            console.log("tanisha")
        })
        document.getElementById("msgWindow").scrollTop = document.getElementById("msgWindow").scrollHeight
    })
}

async function SendButton(event)
{
    //event.preventDefault()

    
    console.log("button clicked")
    if (document.getElementById("msg").value.trim() == "")
    {
        return
    }
    console.log(document.getElementById("msg").value.trim())
    fetch("chatmsg.php", 
{
    method: "POST",
    headers: 
    {
        "Content-Type" : "application/x-www-form-urlencoded"
    },
    body: `message=${document.getElementById("msg").value.trim()}&username=${username}&type=upload&time=${Math.floor(Date.now() / 1000)}`,
})
    .then(res => res.json())
    .then( data => 
    {
        console.log(document.getElementById("msg").value.trim())
        fetchMessage()
    })
    document.getElementById("msg").value = ""
    fetchMessage()
}

function LogoutButton(event)
{
    console.log("logout clicked")
    window.location.assign('login.php?action=signout')
}


document.getElementById("sendBtn").addEventListener("click", SendButton);
setInterval(fetchMessage, 5000);
document.getElementById("logoutButton").addEventListener("click", LogoutButton)