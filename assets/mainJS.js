window.onload = () => {
  const chance = Math.random() * 100 < 15 ? true : false

  fetch("/random", {
    method: 'POST',
    body: JSON.stringify({ chance: chance }), // stringify JSON
    headers: new Headers({ "Content-Type": "application/json" }) // add headers
  })
  .then(res => res.json())
  .then(data => {
    if(data.error)
      return console.error("Something went wrong!")

    let content = document.querySelector("#content")

    console.log(data.results.length);
    if(data.results.length == 0){
      let newitem = document.createElement("div")
      newitem.className = 'no-items'
      newitem.innerHTML = "Do tej pory nie pojawiły się żadne wpisy! Spróbuj szczęścia i wylosuj jako pierwszy!";
      content.append(newitem)
      return;
    }

    for(let i = 0; i < data.results.length; i++){
      if(!data.results[i])
        break;

      let result = data.results[i]

      let newitem = document.createElement("div")
      newitem.className = (i == 0 && data.chance) ? 'item flagged' : 'item'

      const date = new Date(result.date)
      const hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
      const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      const secs = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()

      const dateFormat = `${hours}:${minutes}:${secs}`

      let text = document.createElement("div")
      text.innerHTML = dateFormat

      let img = document.createElement("div")
      img.innerHTML = result.nr

      newitem.append(text)
      newitem.append(img)

      content.append(newitem)
    }
  })
}
